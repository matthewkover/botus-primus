module.exports = {
    name: 'cdr',
    description: 'This converts CDR to AH.',
    execute(message, args) {
        var tout = 300000; //5 mins
        var temp = message.content.split(" ");
        message.delete();
        if (temp.length == 1 || !(temp[1] === parseInt(temp[1], 10)))
            message.channel.send("**Wrong input!**").then(d => {d.delete({timeout: tout})});
        else
            message.channel.send("You need " + "**" + (100 * ((1 / ( 1 - int(temp[1]))) -1)) + "**" + "ability haste to achive" + temp[1] + "CDR.").then(d => {d.delete({timeout: tout})});    
    }
}
