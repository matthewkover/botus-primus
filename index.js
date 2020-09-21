const Discord = require('discord.js');
const client = new Discord.Client();
const ping = require('minecraft-server-util');
const PREFIX = "!";
const fs = require('fs');

client.commands = new Discord.Collection();

// READ COMMAND DIRECTORY

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// STARTUP

client.on('ready', () =>{
    console.log('Bot is online.');
    updateStatusIcon();
    updateStatusText();
    setInterval(updateStatusText, 1 * 60 * 1000)
    setInterval(updateStatusIcon, 1 * 60 * 1000)
})

// STATUS TEXT QUERY

function updateStatusText() {
    ping('51.178.75.64', 41489, (error, response) => {
        console.log("Query was made.")
        if (response !== null) {
            client.user.setActivity('status: online (' + response.onlinePlayers + ' / ' + response.maxPlayers + ')', {type:'WATCHING'})
        }
        if (response == null) {
            client.user.setActivity('status: offline', {type:'WATCHING'})
        }
    });
};

// STATUS ICON QUERY

function updateStatusIcon() {
    ping('51.178.75.64', 41489, (error, response) => {
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

// CHAT COMMANDS

client.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case 'help':
            client.commands.get('help').execute(message, args, Discord);
        break;
        case 'ping':
            client.commands.get('ping').execute(message, args);
        break;
        case 'communism':
            client.commands.get('communism').execute(message, args);
        break;
        case 'role':
            client.commands.get('role').execute(message, args);
        break;
        case 'status':
            client.commands.get('status').execute(message, args, ping, Discord, updateStatusIcon, updateStatusText);
        break;
        default:
            message.channel.send('This command does not exist.');
    }
})

client.login(process.env.BOT_TOKEN);