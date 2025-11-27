# Final Project main.py - NBA Stats Discord Bot
# dicordpy.readthedocs.io/en/stable/api.html <- Documentation Reference

# Import necessary libraries
import discord
from discord.ext import commands
import logging
from dotenv import load_dotenv
import os
from nba_api.stats.static import players, teams
from nba_api.stats.endpoints import playercareerstats

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
# Command to fetch NBA player stats-----------------------------------------------------------
def get_player_season_averages(player_name: str, season: str = "2024-25"):
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
    season_stats = stats_df[stats_df["SEASON_ID"] == f"2{season.replace('-', '')}"]

    if season_stats.empty:
        return None, "No stats for this season."

    stats = season_stats.iloc[0]

    # Step 4: Get the player's team from the team ID in the stats
    team_id = int(stats["TEAM_ID"])
    team_info = next((t for t in teams.get_teams() if t["id"] == team_id), None)

    return {
        "player_name": player["full_name"],
        "team_name": team_info["full_name"] if team_info else "Unknown Team",
        "ppg": stats["PTS"],
        "rpg": stats["REB"],
        "apg": stats["AST"],
        "mpg": stats["MIN"],
        "games_played": stats["GP"]
    }, None

@bot.command()
async def stats(ctx, *, player_name):
    data, error = get_player_season_averages(player_name)

    if error:
        await ctx.send(error)
        return

    msg = (
        f"**{data['player_name']}** — *{data['team_name']}*\n"
        f"PPG: {data['ppg']:.1f}\n"
        f"RPG: {data['rpg']:.1f}\n"
        f"APG: {data['apg']:.1f}\n"
        f"MPG: {data['mpg']:.1f}\n"
        f"Games Played: {data['games_played']}"
    )

    await ctx.send(msg)



@bot.event
async def on_ready():
    print(f'We have logged in as {bot.user}')

bot.run(token,log_handler=handler, log_level=logging.DEBUG)



# ________ Bot is online and running ________


# To Do List:
# 1. Implement commands to fetch NBA stats
# 2. Handle errors and exceptions
# 3. Add more features as needed
# 4. Test the bot thoroughly
# 5. Deploy the bot to a server or cloud platform


