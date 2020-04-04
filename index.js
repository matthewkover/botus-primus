const Discord = require('discord.js');
const client = new Discord.Client();
const ping = require('minecraft-server-util');

const PREFIX = "!";

client.on('ready', () =>{
    console.log('Bot is online.');
    updateStatus();
    setInterval(updateStatus, 1 * 60 * 1000) // Updates every 2.5 minutes (API caches 5 minutes)
})

function updateStatus() {
    ping('afb.serveminecraft.net', 25565, (error, response) => {
        console.log(response)
        if (response !== null) {
            client.user.setPresence({
                game: {
                    name: response.onlinePlayers + ' of ' + response.maxPlayers + ' players are online',
                    type: ""
                },
                status: "online"
            })
        }
        if (response == null) {
            client.user.setPresence({
                game: {
                    name: "Server is offline.",
                    type: ""
                },
                status: "dnd"
            })
            throw error;
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