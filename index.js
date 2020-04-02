const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'Njk1Mjk1ODEzOTU3NzEzOTYx.XoYJbw.HfIILmnJyvWBZsv6MMJZjYv7hvA';

const PREFIX = "!";

client.on('ready', () =>{
    console.log('Bot is online.');
})

client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'who':
            message.reply('My name is *botus primus*. I am a happy wall builder.');
        break;
    }
})

client.login(token);