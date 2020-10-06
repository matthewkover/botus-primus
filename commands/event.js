class Event {
    constructor(id, ename, date, acc, dec, tent, mb, dm) {
        this.eventId = id;
        this.eventName = ename;
        this.eventDate = date;
        this.accepted = acc;
        this.declined = dec;
        this.tentative = tent;
        this.madeBy = mb;
        this.dateMade = dm;
    }
}

function checkInt(yy, mm, dd, hh, min) {
    if (!Number.isInteger(yy / 1) || !Number.isInteger(mm / 1) || !Number.isInteger(dd / 1) || !Number.isInteger(hh / 1) || !Number.isInteger(min / 1)) 
        return false;
    return true;
}

function splitMessage(input) {
    for (var i = 0; i < input.length; i++) {
        if (input[i] == '.' || input[i] == ':') 
            input = input.substring(0, i) + ' ' + input.substring(i + 1);
    }
    input = input.split(" ");
    input.shift();
    return input;
}

function getEventName(tomb) {
    var event = "";
    for (var i = 0; i < tomb.length; i++) {
        if (i == 0)
            event = tomb[i];
        else
            event = event + " " + tomb[i];
    }
    return event;
} 

function storeEvent(msg, e) {
    var raw = splitMessage(msg.content);
    var newevent = new Event();
    newevent.eventId = 0;
    newevent.eventName = 0;
    newevent.eventDate = 0;
    newevent.accepted = 0;
    newevent.declined = 0;
    newevent.tentative = 0;
    newevent.madeBy = msg.author.username;
    newevent.dateMade = msg;
    
}

module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        //
        /*var events = [];
        var e = new Event();
        var tomb = e.splitMessage(message.content)
        min = tomb[tomb.length - 1];
        tomb.pop();
        hh = tomb[tomb.length - 1];
        tomb.pop();
        dd = tomb[tomb.length - 1];
        tomb.pop();
        mm = tomb[tomb.length - 1];
        tomb.pop();
        yy = tomb[tomb.length - 1];
        tomb.pop();
        var event = e.getEventName(tomb);*/
        var d = new Date (message.createdTimestamp)
        const Embed = new Discord.MessageEmbed()
        .setAuthor('Event')
        .setDescription('> ' + d.toLocaleString())
        .addField('Time', '> Time')
        .addFields (
            { name: 'Accepted', value: '> ACCEPTED_USERS\n> ACCEPTED_USERS', inline: true},
            { name: 'Declined', value: '> DECLINED_USERS', inline: true},
            { name: 'Tentative', value: '> TENTATIVE_USERS', inline: true},
        )
        .setFooter('Created by ' + message.author.username)
        .setTimestamp()
        ;
        message.channel.send(Embed).then(async msg => {
            msg.react('✅')
            msg.react('❌')
            msg.react('❔')
        });
    }
}
