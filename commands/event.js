class Event {
    constructor(id, ename, date, acc, dec, tent) {
        this.eventId = id;
        this.eventName = ename;
        this.eventDate = date;
        this.accepted = acc;
        this.declined = dec;
        this.tentative = tent;
    }
    
    checkIfInt(yy, mm, dd, hh, min) {
        if (!Number.isInteger(yy / 1) || !Number.isInteger(mm / 1) || !Number.isInteger(dd / 1) || !Number.isInteger(hh / 1) || !Number.isInteger(min / 1)) 
            return false;
        return true;
    }
    
    splitMessage(input) {
        for (var i = 0; i < input.length; i++) {
            if (input[i] == '.' || input[i] == ':') {
                input = input.substring(0, i) + ' ' + input.substring(i + 1);
            }
        }
        input = input.split(" ");
        return input.shift();
    }
    
}


module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        const Embed = new Discord.MessageEmbed()
        .setAuthor('EVENT_TITLE')
        .setDescription('')
        .addField('Time', 'TIME')
        .addFields (
            { name: 'Accepted', value: '> ACCEPTED_USERS', inline: true},
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
