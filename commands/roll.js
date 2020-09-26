function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'roll',
    description: 'This is a command rolls a dice.',
    execute(message, args) {
        var temp = message.content.split(" ");
        if (temp.length == 1) {
            message.reply(" rolled " + "**" + getRandomInt(1, 6) + "**.");
        } else if (temp.length == 2) {
            try {
                if (temp[1] % 1 == 0) {
                   message.reply(" rolled " + "**" + getRandomInt(1, temp[1]) + "**.");
                }
            }
            catch (err) {
                message.channel.send("Wrong input");
            }
        } else if (temp.length == 3) {
            try {
                if (temp[1] % 1 == 0 && temp[2] % 1 == 0 ) {
                    message.reply(" rolled " + "**" + getRandomInt(temp[1], temp[2]) + "**.");
                }
            }
            catch (err) {
                message.channel.send("Wrong input");
            }
        } else {
            message.channel.send("Wrong input");
        }
    }
}
