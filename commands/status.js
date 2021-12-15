module.exports = {
  name: "status",
  description: "This command pings the hardwired Minecraft channel and gives a status.",
  execute(message, args, ping, Discord) {
    ping("afb.serveminecraft.com", 25565, (error, response) => {
      if (response == null) {
        message.delete()
        const Embed = new Discord.MessageEmbed()
          .setAuthor("The server seems to be offline.")
          .setDescription("The filthy capitalist scum have taken our magnificent server away. We must wait our Supreme Leader to take back what is lost.")
          .setColor("E85D75")
          .setTimestamp()
          .setFooter("Brought to you with love from Commissar Botus Primus.", "https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg")

        message.channel.send(Embed).then((d) => {
          d.delete({ timeout: 1000 * 60 * 3 })
        });
      }
      if (response !== null && response.onlinePlayers == 0) {
        message.delete();
        const Embed = new Discord.MessageEmbed()
          .setTitle("Server is online")
          .setColor("f7a922")
          .setAuthor("All Fill Boys Server", "https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png", "")
          .setThumbnail("https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png")
          .addFields(
            { name: "Description", value: "Created by All Fill Boiz"},
            { name: "Server IP", value: response.host },
            { name: "Online players", value: "There are no players online" },
            { name: "Players", value: "Online: " + "`" + response.onlinePlayers + "`" + "\n" + "Maximum: " + "`" + response.maxPlayers + "`", inline: true },
          )
          .addField("Version", response.version, true)
          .setTimestamp()
          .setFooter("Brought to you with love from Commissar Botus Primus.", "https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg")

        message.channel.send(Embed).then((d) => {
          d.delete({ timeout: 1000 * 60 * 3 });
        });
      }
      if (response !== null && response.onlinePlayers !== 0) {
        message.delete();
        var array = response.samplePlayers;
        var players = "";

        for (let index = 0; index < array.length; index++) {
          players = players + array[index].name + "\n "
        }

        const Embed = new Discord.MessageEmbed()
          .setTitle("Server is online")
          .setColor("45b781")
          .setAuthor("All Fill Boys Server", "https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png", "")
          .setThumbnail("https://cdn.discordapp.com/attachments/630197241033785344/695383822564589608/AFB_LOGO_1.png")
          .addFields(
            { name: "Description", value: "Created by All Fill Boiz"},
            { name: "Server IP", value: response.host },
            { name: "Online players", value: players },
            { name: "Players", value: "Online: " + "`" + response.onlinePlayers + "`" + "\n" + "Maximum: " + "`" + response.maxPlayers + "`", inline: true },
          )
          .addField("Version", response.version, true)
          .setTimestamp()
          .setFooter("Brought to you with love from Commissar Botus Primus.", "https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg")

        message.channel.send(Embed).then((d) => {
          d.delete({ timeout: 1000 * 60 * 3 })
        });
      }
    });
  },
};
