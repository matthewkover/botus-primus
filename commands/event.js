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
    var bool = false;
    var x;
    for (x in t) {
        if (Number.isInteger(x))
            bool = true;
    }  
    return bool;
}

var getDaysInMonth = function(yy, mm) {return new Date(yy, mm, 0).getDate();};

function checkValid(yy, mm, dd, hh, min) {
    if ((0 < mm < 13) && (0 < dd <= getDaysInMonth(yy,mm)) && (0 <= hh < 24) && (0 <= min < 60)) 
        return true;
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

function checkIfDate(r) {
    var i = r.length - 1;
    if (i < 4)
        return false;
    if (checkValid(Number(r[i-4]),Number(r[i-3]),Number(r[i-2]),Number(r[i-1]),Number(r[i])) && checkInt([Number(r[i-4]),Number(r[i-3]),Number(r[i-2]),Number(r[i-1])]))
        return true;
    return false;
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
            .addField('Time', '> Event time ' + Number(raw[i-4])+ " " + Number(raw[i-3])+ " " + Number(raw[i-2])+ " " + Number(raw[i-1])+ " " +Number(raw[i]))
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
