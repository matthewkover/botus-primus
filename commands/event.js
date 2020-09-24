module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setAuthor('Insert title here')
            .setDescription('Insert description here')
            .addField('Time', 'Insert time here')
            .addFields(
                {name: 'Accepted', value: 'Insert accepted user list here', inline: true},
                {name: 'Declined', value: 'Insert declined user list here', inline: true},
                {name: 'Tentative', value: 'Insert tentative list here', inline: true}
            )
            .setFooter('Created by xyz')
            .setTimestamp()
            ;
        message.channel.send(Embed);
    }
}