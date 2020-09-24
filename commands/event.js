module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setAuthor('Insert title here')
            .setDescription('Insert description here')
            .addFields(
                {name: 'Time', value: 'Insert time here'},
                {name: 'Accepted', value: 'Insert accepted user list here', inline: true},
                {name: 'Declined', value: 'Insert declined user list here', inline: true},
                {name: 'Tentative', value: 'Insert tentative list here', inline: true}
            )
            .setFooter('Brought to you with love from Commissar Botus Primus.', 'https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg')
            .setTimestamp()
            ;
        message.channel.send(Embed);
    }
}