# Final Project main.py - NBA Stats Discord Bot

# !hello - Greets the user
# !stats - Fetches and displays NBA player statistics for the current season
# !teamstats - Fetches and displays NBA team statistics for the current season

# Import necessary libraries
import discord
from discord.ext import commands
import logging
from dotenv import load_dotenv
import os
from nba_api.stats.static import players, teams
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import teamyearbyyearstats

# Set up logging
load_dotenv()
token = os.getenv("DISCORD_TOKEN") 
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
intents = discord.Intents.default()
intents.message_content = True
intents.members = True 

# Create bot instance
bot = commands.Bot(command_prefix='!', intents=intents)

# Message event
@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    if message.content.startswith('!hello'):
        await message.channel.send('Hello! I am your NBA Stats Bot. How can I assist you today?')

    await bot.process_commands(message)
# Command to fetch NBA player stats
def get_player_season_averages(player_name: str, season: str = "2025-26"):
    # Step 1: Find the player
    results = players.find_players_by_full_name(player_name)
    if not results:
        return None, "Player not found."

    player = results[0]
    player_id = player["id"]

    # Step 2: Fetch all career stats
    career = playercareerstats.PlayerCareerStats(player_id=player_id)
    stats_df = career.get_data_frames()[0]

    # Step 3: Filter for the requested season
    season_stats = stats_df[stats_df["SEASON_ID"] == season]
    if season_stats.empty:
        return None, "No stats for this season."

    stats = season_stats.iloc[0]

    # Step 4: Get the player's team from the team ID in the stats
    team_id = int(stats["TEAM_ID"])
    team_info = next((t for t in teams.get_teams() if t["id"] == team_id), None)

    return {
        "player_name": player["full_name"],
        "team_name": team_info["full_name"] if team_info else "Unknown Team",
        "ppg": stats["PTS"]/stats["GP"],
        "rpg": stats["REB"]/stats["GP"],
        "apg": stats["AST"]/stats["GP"],
        "bpg": stats["BLK"]/stats["GP"],
        "spg": stats["STL"]/stats["GP"],
        "mpg": stats["MIN"]/stats["GP"],
        "fg_percentage": stats["FG_PCT"]*100,
        "three_pt_percentage": stats["FG3_PCT"]*100,
        "free_throw_percentage": stats["FT_PCT"]*100,

        "games_played": stats["GP"]
    }, None
# Command to get player stats
@bot.command()
async def stats(ctx, *, player_name):
    data, error = get_player_season_averages(player_name)

    if error:
        await ctx.send(error)
        return
    # Create a display for player stats
    embedp = discord.Embed(
        title=f"{data['player_name']} | {data['team_name']}",
        description=f"**Stats for 2025-26 Season**",
        color=0xE03A3E)
    embedp.add_field(name="Points Per Game", value=f"{data['ppg']:.1f}", inline=True)
    embedp.add_field(name="Rebounds Per Game", value=f"{data['rpg']:.1f}", inline=True)
    embedp.add_field(name="Assists Per Game", value=f"{data['apg']:.1f}", inline=True)
    embedp.add_field(name="Blocks Per Game", value=f"{data['bpg']:.1f}", inline=True)
    embedp.add_field(name="Steals Per Game", value=f"{data['spg']:.1f}", inline=True)
    embedp.add_field(name="Minutes Per Game", value=f"{data['mpg']:.1f}", inline=True)
    embedp.add_field(name="Field Goal %", value=f"{data['fg_percentage']:.1f}%", inline=True)
    embedp.add_field(name="3-Point %", value=f"{data['three_pt_percentage']:.1f}%", inline=True)
    embedp.add_field(name="Free Throw %", value=f"{data['free_throw_percentage']:.1f}%", inline=True)
    embedp.add_field(name="Games Played", value=f"{data['games_played']}", inline=True)

    await ctx.send(embed=embedp)

# Function to gather team stats based on a string
def get_team_stats(search_term: str):
    # Step 1: Find the team ID from the string
    nba_teams = teams.get_teams()
    found_team = None
    
    # Normalize search term to lowercase
    search = search_term.lower()
    for team in nba_teams:
        if (search in team['full_name'].lower() or 
            search in team['city'].lower() or 
            search == team['abbreviation'].lower()):
            found_team = team
            break
    if not found_team:
        return None, f"Could not find a team matching '{search_term}'."

    team_id = found_team['id']

    # Step 2: Pull all related stats using the Team ID
    stats_endpoint = teamyearbyyearstats.TeamYearByYearStats(team_id=team_id)
    stats_df = stats_endpoint.get_data_frames()[0]

    # Step 3: Filter for the current season (2025-26)
    current_season = "2025-26" 
    season_stats = stats_df[stats_df["YEAR"] == current_season]

    if season_stats.empty:
        return None, f"No stats found for {found_team['full_name']} in {current_season}."
    data = season_stats.iloc[0]

    # Step 4: Return a dictionary of the specific stats we want
    return {
        "team_name": found_team['full_name'],
        "team_id": team_id,
        "season": current_season,
        "wins": data["WINS"],
        "losses": data["LOSSES"],
        "win_pct": data["WIN_PCT"],
        "conf_rank": data["CONF_RANK"], 
        "ppg": data["PTS_RANK"],        
        "gp": data["GP"]
    }, None

# Command to post all those stats
@bot.command()
async def teamstats(ctx, *, team_search):
    data, error = get_team_stats(team_search)

    if error:
        await ctx.send(error)
        return

    # Create the display
    embedt = discord.Embed(
        title=f"{data['team_name']} | {data['season']}",
        description=f"**Record:** {data['wins']}-{data['losses']} ({data['win_pct']:.3f})",
        color=0x1D428A)
    embedt.add_field(name="Conference Rank", value=f"#{data['conf_rank']}", inline=True)
    embedt.add_field(name="Games Played", value=f"{data['gp']}", inline=True)
    embedt.add_field(name="Points Per Game", value=f"#{data['ppg']}", inline=True)
    
    await ctx.send(embed=embedt)

# Run the bot
bot.run(token, log_handler=handler, log_level=logging.DEBUG)