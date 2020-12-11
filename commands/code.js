module.exports = {
    name: 'code',
    description: 'Can be used for sharing GitHub codes',
    execute(message, args, fetch) {
        var url = "https://raw.githubusercontent.com/matthewkover/botus-primus/master/commands/code.js";
        d = fetch(url);
        d = d.text();
        message.reply("```py\n" + d + "```");
    }
}
