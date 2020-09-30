/*class Event {
    function Event(id, ename, date, acc, dec, tent) {
        this.id = id;
        this.ename = ename;
        this.date = date;
        this.acc = acc;
        this.dec = dec;
        this.tent = tent;
    }
}*/





module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        const Embed = new Discord.MessageEmbed()
        .setAuthor('EVENT_TITLE')
        .setDescription('EVENT_DESCRIPTION')
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
