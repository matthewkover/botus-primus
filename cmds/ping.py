import discord
from discord import app_commands

@app_commands.command(description="Returns the latency of the server")
async def ping(interaction: discord.Interaction):
    await interaction.response.send_message(f"🏓 Pong!",ephemeral=True)

async def setup(bot):
    bot.tree.add_command(ping)