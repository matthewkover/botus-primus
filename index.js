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
            client.user.setActivity('!help', {type:'LISTENING'})
        }
        if (response == null) {
            client.user.setActivity(' !help', {type:'LISTENING'})
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
            client.user.setStatus('online')
        }
        if (response == null) {
            client.user.setStatus('online')
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
        case 'event':
            client.commands.get('event').execute(message, args, Discord);
        break;
        case 'roll':
            client.commands.get('roll').execute(message, args);
        break;
        case 'championpool':
            client.commands.get('championpool').execute(message, args);
        break;
        default:
            message.channel.send('The following command does not exists: **!' + command + '**\nWrite **!help** to see the list of things I can do.');
    }
})

client.login(process.env.BOT_TOKEN);
