class Event {
    constructor(id, ename, date, acc, dec, tent) {
        this.eventId = id;
        this.eventName = ename;
        this.eventDate = date;
        this.accepted = acc;
        this.declined = dec;
        this.tentative = tent;
    }
    
    checkInt(yy, mm, dd, hh, min) {
        if (!Number.isInteger(yy / 1) || !Number.isInteger(mm / 1) || !Number.isInteger(dd / 1) || !Number.isInteger(hh / 1) || !Number.isInteger(min / 1)) 
            return false;
        return true;
    }
    
    splitMessage(input) {
        for (var i = 0; i < input.length; i++) {
            if (input[i] == '.' || input[i] == ':') 
                input = input.substring(0, i) + ' ' + input.substring(i + 1);
        }
        input = input.split(" ");
        input.shift();
        return input;
    }
    
    getEventName(tomb) {
        var event = "";
        for (var i = 0; i < tomb.length; i++) {
            if (i == 0)
                event = tomb[i];
            else
                event = event + " " + tomb[i];
        }
        return event;
   } 
}


module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        //
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
        var event = e.getEventName(tomb);
        
        const Embed = new Discord.MessageEmbed()
        .setAuthor('Event')
        .setDescription('> ' + event)
        .addField('Time', '> ' + yy + '.' + mm + '.' + dd + '. ' + hh + ':' + min)
        .addFields (
            { name: 'Accepted', value: '> ACCEPTED_USERS\n> ACCEPTED_USERS'},
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
