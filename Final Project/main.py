# Final Project main.py - NBA Stats Discord Bot
# dicordpy.readthedocs.io/en/stable/api.html <- Documentation Reference

import discord
from discord.ext import commands
import logging
from dotenv import load_dotenv
import os

load_dotenv()
token = os.getenv("DISCORD_TOKEN") 

# Set up logging
handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')
intents = discord.Intents.default()
intents.message_content = True
intents.members = True 

# Create bot instance
bot = commands.Bot(command_prefix='!', intents=intents)

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
