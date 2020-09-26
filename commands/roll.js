function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = {
    name: 'roll',
    description: 'This is a command rolls a dice.',
    execute(message, args) {
        var temp = message.content.split(" ");
        if (temp.length == 1) {
            message.reply(" rolled " + "**" + getRndInteger(1, 6) + "**.");
        } else if (temp.length == 2) {
            try {
                if (temp[1] % 1 == 0) {
                   message.reply(" rolled " + "**" + (Math.floor(Math.random() * 100) + 1) + "**.");
                }
            }
            catch (err) {
                message.channel.send("Wrong input");
            }
        } else if (temp.length == 3) {
            try {
                if (temp[1] % 1 == 0 && temp[2] % 1 == 0 ) {
                    message.channel.send(message.author.username + " rolled " + Math.floor(Math.random() * temp[2]) + temp[1]);
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
