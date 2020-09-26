module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        const Embed = new Discord.MessageEmbed()
        
        message.channel.send(Embed);
    }
}