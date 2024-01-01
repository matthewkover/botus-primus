from discord.ext import commands

@commands.group()
async def util(ctx):
    if ctx.invoked_subcommand is None:
        await ctx.send(f"No, {ctx.subcommand_passed} does not belong to util")

@util.command()
async def ping(ctx):
    await ctx.send("pong")

async def setup(bot):
    bot.add_command(util)
