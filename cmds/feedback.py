import discord
import settings
import traceback
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
        channel = interaction.guild.get_channel(settings.FEEDBACK_CH)

        embed = discord.Embed(title=self.fb_title.value,
                              description=self.message.value,
                              color=discord.Color.yellow())
        embed.set_author(name=interaction.user)

        await channel.send(embed=embed)
        await interaction.response.send_message(f"Thank you, {interaction.user} for your suggestion!", ephemeral=True)

    async def on_error(self, interaction: discord.Interaction, error):
        traceback.print_tb(error.__traceback__)

@app_commands.command(description="Give us suggestions for bot development")
async def feedback(interaction: discord.Interaction):
    feedback_modal = FeedbackModal()
    feedback_modal.user = interaction.user
    await interaction.response.send_modal(feedback_modal)

async def setup(bot):
    bot.tree.add_command(feedback)