const Discord = require('discord.js');
const client = new Discord.Client();
const ping = require('minecraft-server-util');

const PREFIX = "!";

client.on('ready', () =>{
    console.log('Bot is online.');
    updateStatusMessage();
    setInterval(updateStatus, 1 * 60 * 1000)
})

function updateStatusMessage() {
    ping('afb.serveminecraft.net', 25565, (error, response) => {
        console.log(response)
        if (response !== null && response.onlinePlayers !== 0) {
            client.user.setPresence ( {
                name: response.onlinePlayers + ' of ' + response.maxPlayers + ' players are online',
                status: 'online'
            })
        }
        if (response !== null && response.onlinePlayers == 0) {
            client.user.setPresence( {
                name: "Nobody is online",
                status:'idle'
            })
        }
        if (response == null) {
            client.user.setPresence({
                name: "Server is offline",
                status: 'dnd'
            })
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
    }
})

client.login(process.env.BOT_TOKEN);