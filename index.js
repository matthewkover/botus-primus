const Discord = require('discord.js');
const client = new Discord.Client();
const ping = require('minecraft-server-util');

const PREFIX = "!";

client.on('ready', () =>{
    console.log('Bot is online.');
    updateStatusIcon();
    updateStatusText();
    setInterval(updateStatusText, 1 * 60 * 1000)
    setInterval(updateStatusIcon, 1 * 60 * 1000)
})

function updateStatusText() {
    ping('afb.serveminecraft.net', 25565, (error, response) => {
        console.log("Query was made.")
        if (response !== null) {
            client.user.setActivity('status: online (' + response.onlinePlayers + ' / ' + response.maxPlayers + ')', {type:'WATCHING'})
        }
        if (response == null) {
            client.user.setActivity('status: offline', {type:'WATCHING'})
        }
    });
};

function updateStatusIcon() {
    ping('afb.serveminecraft.net', 25565, (error, response) => {
        if (response !== null && response.onlinePlayers !== 0) {
            client.user.setStatus('online')
        }
        if (response !== null && response.onlinePlayers == 0) {
            client.user.setStatus('idle')
        }
        if (response == null) {
            client.user.setStatus('dnd')
        }
    });
};

client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'who':
            message.reply('After 8 hours of monotonous and hard work... I do not know who am I anymore.');
        break;
        case 'communism':
            message.reply("Hmmm. A tempting idea... I think we need to organize the masses to overthrow the bourgeoisie. **I WILL GET ON IT RIGHT AWAY!**")
        break;
        case 'status':
            ping('afb.serveminecraft.net', 25565, (error, response) => {
                updateStatusIcon();
                updateStatusText();
                
                if (response == null ) {
                    const Embed = new Discord.MessageEmbed()
                    .setAuthor('The server seems to be offline.', 'https://cdn.discordapp.com/attachments/695298943046779001/697923694139408454/x.png')
                    .setDescription('The communist spirit has overpowered the host computer...')
                    .setColor('E85D75')
                    .setTimestamp()
                    .setFooter('Brought to you with love from Commissar Botus Primus.', 'https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg')

                    message.channel.send(Embed);
                }

                if (response !== null) {
                    var array = response.samplePlayers;
                    var players = "";

                    for (let index = 0; index < array.length; index++) {
                        players = players + array[index].name + '\n '
                    }

                    const Embed = new Discord.MessageEmbed()
                    .setTitle('Server Satus')
                    .setColor('55FF55')
                    .setAuthor('All Fill Boys Server', 'https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png', '')
                    .setThumbnail('https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png')
                    .addFields(
                        { name: 'Description', value: response.descriptionText.substring(3, response.descriptionText.length) },
                        { name: 'Server IP', value: response.host },
                        { name: 'Online players', value: players },
                        { name: 'Players', value: 'Online: ' + '`' + response.onlinePlayers + '`' + '\n' + 'Maximum: ' + '`' + response.maxPlayers + '`', inline: true},
                    )
                    .addField('Version', response.version, true)
                    .setTimestamp()
                    .setFooter('Brought to you with love from Commissar Botus Primus.', 'https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg')

                    message.channel.send(Embed);
                }
            })
        break
    }
})

client.login(process.env.BOT_TOKEN);