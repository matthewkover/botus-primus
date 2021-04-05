function isInt(str) {
  return !isNaN(str) && Number.isInteger(parseFloat(str));
}

module.exports = {
  name: "ah",
  description: "This command converts AH to CDR.",
  execute(message) {
    var tout = 300000; //5 mins
    var temp = message.content.split(" ");
    message.delete();
    if (temp.length <= 1 || !isInt(temp[1]))
      message.channel.send("**Wrong input!**").then((d) => {
        d.delete({ timeout: tout });
      });
    else {
    var cdr = 100 * (1 - 1 / (1 + (parseInt(temp[1], 10) / 100)))
      message.channel
        .send(
        "**" + temp[1] + "** ability haste gives you " + "**" + Number(cdr).toFixed(2) + "%**" + " cooldown reduction."
        )
        .then((d) => {
          d.delete({ timeout: tout });
        });
    }
  },
};
