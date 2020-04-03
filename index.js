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
        if (error) {
            client.user.setACtivity("Server is offline.")
            client.user.setStatus("dnd")
        }
        client.user.setActivity(response.onlinePlayers + ' of ' + response.maxPlayers + ' players are online') 
    })
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