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
        case 'tovarish' :
            message.reply("``` \
            Белая армия, чёрный барон \
            Снова готовят нам царский трон, \
            Но от тайги до британских морей \
            Красная Армия всех сильней. \
            \
            Так пусть же Красная \
            Сжимает властно \
            Свой штык мозолистой рукой, \
            И все должны мы \
            Неудержимо \
            Идти в последний смертный бой! \
            \
            Так пусть же Красная \
            Сжимает властно \
            Свой штык мозолистой рукой, \
            И все должны мы \
            Неудержимо \
            Идти в последний смертный бой! \
            \
            Красная Армия, марш, марш вперёд! \
            Реввоенсовет нас в бой зовёт. \
            Ведь от тайги до британских морей \
            Красная Армия всех сильней! \
            \
            Так пусть же Красная \
            Сжимает властно \
            Свой штык мозолистой рукой, \
            И все должны мы \
            Неудержимо \
            Идти в последний смертный бой! \
            \
            Так пусть же Красная \
            Сжимает властно \
            Свой штык мозолистой рукой, \
            И все должны мы \
            Неудержимо \
            Идти в последний смертный бой! \
            \
            Белая армия, чёрный барон \
            Снова готовят нам царский трон, \
            Но от тайги до британских морей \
            Красная Армия всех сильней. \
            \
            Так пусть же Красная \
            Сжимает властно \
            Свой штык мозолистой рукой, \
            И все должны мы \
            Неудержимо \
            Идти в последний смертный бой! \
            \
            Так пусть же Красная \
            Сжимает властно \
            Свой штык мозолистой рукой, \
            И все должны мы \
            Неудержимо \
            Идти в последний смертный бой!```")
        break;
    }
})

client.login(process.env.BOT_TOKEN);