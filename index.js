const Discord = require('discord.js');
const client = new Discord.Client();
const ping = require('minecraft-server-util');

const PREFIX = "!";

const fs = require('fs');

client.commands = new Discord.Collection();

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

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
})

/*
client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'who':
            message.reply('After 8 hours of monotonous and hard work... I do not know who am I anymore.');
        break;
        case 'role':
            let args = message.content.toLowerCase().substring(6);
            let { cache } = message.guild.roles;
            let role = cache.find(role => role.name.toLowerCase() === args)
            if (role) {
                if (message.member.roles.cache.has(role.id)) {
                    message.channel.send("You already have this role!");
                    return;
                }
                if (
                    role.permissions.has('ADMINISTRATOR') || 
                    role.permissions.has('KICK_MEMBERS') || 
                    role.permissions.has('BAN_MEMBERS') ||
                    role.permissions.has('MANAGE_GUILD') ||
                    role.permissions.has('MANAGE_CHANNELS')
                ) {
                    message.channel.send("You cannot add yourself to this role.");
                }
                else {
                    message.member.roles.add(role)
                        .then(member => message.channel.send("You were added to this role!"))
                        .catch(err => console.log(err));
                }
            }
            else {
                Message.channel.send("Role not found!");
            }


        break;
        case 'communism':
            message.reply("Hmmm. A tempting idea... I think we need to organize the masses to overthrow the bourgeoisie. **I WILL GET ON IT RIGHT AWAY!**")
        break;
        case 'status':
            ping('51.178.75.64', 41489, (error, response) => {
                updateStatusIcon();
                updateStatusText();
                
                if (response == null) {
                    message.delete()
                    const Embed = new Discord.MessageEmbed()
                    .setAuthor('The server seems to be offline.')
                    .setDescription('The filthy capitalist scum have taken our magnificent server away. We must wait our Supreme Leader to take back what is lost.')
                    .setColor('E85D75')
                    .setTimestamp()
                    .setFooter('Brought to you with love from Commissar Botus Primus.', 'https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg')

                    message.channel.send(Embed).then(d => {d.delete({timeout: 1000 * 60 * 3})});
                }
                if (response !== null && response.onlinePlayers == 0) {
                    message.delete();
                    const Embed = new Discord.MessageEmbed()
                    .setTitle('Server is online')
                    .setColor('f7a922')
                    .setAuthor('All Fill Boys Server', 'https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png', '')
                    .setThumbnail('https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png')
                    .addFields(
                        { name: 'Description', value: response.descriptionText.substring(3, response.descriptionText.length) },
                        { name: 'Server IP', value: response.host },
                        { name: 'Online players', value: "There are no players online" },
                        { name: 'Players', value: 'Online: ' + '`' + response.onlinePlayers + '`' + '\n' + 'Maximum: ' + '`' + response.maxPlayers + '`', inline: true},
                    )
                    .addField('Version', response.version, true)
                    .setTimestamp()
                    .setFooter('Brought to you with love from Commissar Botus Primus.', 'https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg')

                    message.channel.send(Embed).then(d => {d.delete({timeout: 1000 * 60 * 3})});
                }
                if (response !== null && response.onlinePlayers !== 0) {
                    message.delete();
                    var array = response.samplePlayers;
                    var players = "";

                    for (let index = 0; index < array.length; index++) {
                        players = players + array[index].name + '\n '
                    }

                    const Embed = new Discord.MessageEmbed()
                    .setTitle('Server is online')
                    .setColor('45b781')
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

                    message.channel.send(Embed).then(d => {d.delete({timeout: 1000 * 60 * 3})});
                }
            })
        break
    }
})
*/

client.login(process.env.BOT_TOKEN);