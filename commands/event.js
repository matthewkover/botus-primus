module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        const Embed = new Discord.MessageEmbed()
        .setAuthor('EVENT_TITLE')
        .setDescription('EVENT_DESCRIPTION')
        .addField('Time', 'TIME', true)
        .addFields (
            { name: 'Accepted', value: 'ACCEPTED_USERS'},
            { name: 'Declined', value: 'DECLINED_USERS'},
            { name: 'Tentative', value: 'TENTATIVE_USERS'},
        )
        .setFooter('Created by xyz')
        .setTimestamp()
        ;
        message.channel.send(Embed);
    }
}