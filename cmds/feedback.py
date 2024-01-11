import discord
from discord import app_commands

class FeedbackModal(discord.ui.Modal, title="Send us your feedback!"):
    fb_title = discord.ui.TextInput(
        style=discord.TextStyle.short,
        label="Title",
        required=True,
        placeholder="Give your feedback a title"
    )
    message = discord.ui.TextInput(
        style=discord.TextStyle.long,
        label="Detailed Suggestion",
        required=False,
        max_length=500,
        placeholder="Describe your suggestion"
    )

    async def on_submit(self, interaction: discord.Interaction):
        ... # TODO: Develop the on submit statement.

    async def on_error(self, interaction: discord.Interaction, error):
        ... # TODO: Develop error handling.

@app_commands.command(description="Give us suggestions for bot development")
async def feedback(interaction: discord.Interaction):
    feedback_modal = FeedbackModal()
    await interaction.response.send_modal(feedback_modal)

async def setup(bot):
    bot.tree.add_command(feedback)