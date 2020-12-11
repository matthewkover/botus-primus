module.exports = {
    name: 'code',
    description: 'Can be used for sharing GitHub codes',
    execute(message, args) {
        message.reply("```py\n" + "print('teszt')\n" + "```");
    }
}
