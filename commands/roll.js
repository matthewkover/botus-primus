function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'roll',
    description: 'This command rolls a dice.',
    execute(message, args) {
        var temp = message.content.split(" ");
        message.delete();
        if (temp.length == 1)
            message.reply("rolled " + "**" + getRandomInt(1, 6) + "**.").then(d => {d.delete({timeout: 1000 * 60 * 5})});
        else if (temp.length == 2 && Number.isInteger(temp[1]/1))
            message.reply("rolled " + "**" + getRandomInt(1, temp[1]) + "**.").then(d => {d.delete({timeout: 1000 * 60 * 5})});
        else if (temp.length == 3 && Number.isInteger(temp[1]/1) && Number.isInteger(temp[2]/1))
            message.reply("rolled " + "**" + getRandomInt(temp[1], temp[2]) + "**.").then(d => {d.delete({timeout: 1000 * 60 * 5})});
        else
            message.channel.send("**Wrong input!**").then(d => {d.delete({timeout: 1000 * 60 * 5})});
    }
}
