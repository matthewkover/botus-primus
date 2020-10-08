class Event {
    constructor(id, ename, date, acc, dec, tent, mb) {
        this.eventId = id;
        this.eventName = ename;
        this.eventDate = date;
        this.accepted = acc;
        this.declined = dec;
        this.tentative = tent;
        this.madeBy = mb;
    }
}

function getDaysInMonth(yy, mm) {
    var daysCount = new Date(yy, mm, 0).getDate();
    return daysCount;
}

function checkBetween(x, min, max) {
    return x >= min && x <= max;
}

function checkValid(yy, mm, dd, hh, min) {
    if (Number.isInteger(yy/1) && checkBetween(mm, 1, 12) && checkBetween(dd, 1, getDaysInMonth(yy, mm)) && checkBetween(hh, 0, 23) && checkBetween(min, 0, 59))
        return true;
    return false;
}

function checkIfDate(r) {
    var i = r.length - 1;
    if (i < 4)
        return false;
    else if (!checkValid(r[i-4],r[i-3],r[i-2],r[i-1],r[i]))
        return false;
    return true;
}

function splitMessage(input) {
    for (var i = 0; i < input.length; i++) {
        if (input[i] == '.' || input[i] == ':') 
            input = input.substring(0, i) + ' ' + input.substring(i + 1);
    }
    input = input.split(" ");
    input.shift();
    return input;
}

function getEventName(tomb) {
    var event = "";
    for (var i = 0; i < tomb.length; i++) {
        if (i == 0)
            event = tomb[i];
        else
            event = event + " " + tomb[i];
    }
    return event;
} 
  
function storeEvent(r, ma) {
    var i = r.length - 1;
    var newevent = new Event();
    newevent.eventId = 0;
    newevent.eventDate = new Date(r[i-4],r[i-3]-1),r[i-2],r[i-1],r[i]);
    for (i = 0; i < 5; i++) 
        r.pop();
    newevent.eventName = getEventName(r);
    newevent.accepted = "a_teszt";
    newevent.declined = "d_teszt";
    newevent.tentative = "t_teszt";
    newevent.madeBy = ma;
    return newevent;
}

function eventTimeToString(e) {
    var idopont = "";
    var today = new Date();
    if (e.getDay() == today.getDay())
        idopont = "Today " + e.getHours() + ":" e.getMinutes();
    else if (e.getDay() == today.getDay() + 1)
        idopont = "Tomorrow " + e.getHours() + ":" e.getMinutes() + " " + e.toDateString();
    else 
        idopont = e.toDateString() + " " + e.getHours() + ":" e.getMinutes();
    return idopont;
}


module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        var tout = 300000; //5 mins
        var raw = splitMessage(message.content);
        var i = raw.length-1;
        message.delete({timeout: tout});
        if (checkIfDate(raw)) {
            var event = storeEvent(raw, message.author.username);
            var date = event.eventDate;
            const Embed = new Discord.MessageEmbed()
            .setAuthor('Event • Created by ' + event.madeBy)
            .setDescription('> ' + event.eventName)
            .addField('Time', '> ' + eventTimeToString(date))
            .addFields (
                { name: 'Accepted', value: '> ' + event.accepted, inline: true},
                { name: 'Declined', value: '> ' + event.declined, inline: true},
                { name: 'Tentative', value: '> ' + event.tentative, inline: true},
            )           
            .setFooter('Brought to you with love from Commissar Botus Primus.', 'https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg')
            .setTimestamp()
            ;
            message.channel.send(Embed).then(async msg => {
                msg.react('✅')
                msg.react('❌')
                msg.react('❔')
            });
        } else {
             message.channel.send("**Wrong date format!**").then(d => {d.delete({timeout: tout})});
        }      
    }
}
