module.exports = {
    name: 'code',
    description: 'Can be used for sharing GitHub codes',
    execute(message, args) {
        message.reply("```txt\n" + "print('teszt')\n" + "```");
    }
}
