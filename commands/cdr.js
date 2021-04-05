function isInt(str) {
  return !isNaN(str) && Number.isInteger(parseFloat(str));
}

module.exports = {
  name: "cdr",
  description: "This command converts CDR to AH.",
  execute(message) {
    var tout = 300000; //5 mins
    var temp = message.content.split(" ");
    message.delete();
    if (temp.length <= 1 || !isInt(temp[1]) || 100 <= parseInt(temp[1], 10))
      message.channel.send("**Wrong input!**").then((d) => {
        d.delete({ timeout: tout });
      });
    else {
      var ah = 100 * (1 / (1 - parseInt(temp[1], 10) / 100) - 1);
      message.channel
        .send(
          "To achive **" +
            temp[1] +
            "%** CDR you need " +
            "**" +
            Number(ah).toFixed(2) +
            "** ability haste."
        )
        .then((d) => {
          d.delete({ timeout: tout });
        });
    }
  },
};
