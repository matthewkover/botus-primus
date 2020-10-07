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

function checkInt(t) {
    var bool = true;
    for (i = 0; i < t.length - 1; i++) {
        if (!Number.isInteger(t[i]))
            return false;
    }
    return true;
}

var getDaysInMonth = function(yy, mm) {return new Date(yy, mm, 0).getDate();};

function checkBetween(x, min, max) {
    return x >= min && x <= max;
}

function checkValid(yy, mm, dd, hh, min) {
    if (checkBetween(mm, 1, 12) && checkBetween(dd, 1, getDaysInMonth(yy, mm)) && checkBetween(hh, 0, 23) && checkBetween(min, 0, 59)) { 
        console.log("checkValid: true");
        return true;
    }
    console.log("checkValid: false");
    return false;
}

function checkIfDate(r) {
    var i = r.length - 1;
    if (i < 4)
        return false;
    else if (!checkInt([r[i-4],r[i-3],r[i-2],r[i-1])]) 
        return false;
    /*else if (!checkValid(Number(r[i-4]),Number(r[i-3]),Number(r[i-2]),Number(r[i-1]),Number(r[i])))
        return false;*/
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
  
function storeEvent(msg, e) {
    var raw = splitMessage(msg.content);
    var newevent = new Event();
    newevent.eventId = 0;
    newevent.eventDate = new Date();
    newevent.eventName = getEventName(tomb);
    newevent.accepted = [];
    newevent.declined = [];
    newevent.tentative = [];
    newevent.madeBy = msg.author.username;

    
}


module.exports = {
    name: 'event',
    description: 'Event reminders can be set by this command',
    execute(message, args, Discord) {
        //
        /*var events = [];
        var e = new Event();
        var tomb = e.splitMessage(message.content)
        min = tomb[tomb.length - 1];
        tomb.pop();
        hh = tomb[tomb.length - 1];
        tomb.pop();
        dd = tomb[tomb.length - 1];
        tomb.pop();
        mm = tomb[tomb.length - 1];
        tomb.pop();
        yy = tomb[tomb.length - 1];
        tomb.pop();
        var event = e.getEventName(tomb);*/
        var tout = 300000; //5 mins
        var raw = splitMessage(message.content);
        var i = raw.length-1;
        if (checkIfDate(raw)) {
            const Embed = new Discord.MessageEmbed()
            .setAuthor('Event')
            .setDescription('> Event name')
            .addField('Time', '> Event time ' + raw[i-4]+ " " + raw[i-3]+ " " + raw[i-2]+ " " + raw[i-1]+ " " +raw[i])
            .addFields (
                { name: 'Accepted', value: '> ' + 'ACCEPTED_USERS\n> ' + 'ACCEPTED_USERS', inline: true},
                { name: 'Declined', value: '> DECLINED_USERS', inline: true},
                { name: 'Tentative', value: '> TENTATIVE_USERS', inline: true},
            )
            .setFooter('Created by ' + message.author.username)
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
