const testModel = require("../models/testSchema");

module.exports = {
  name: "test",
  description: "none",
  async execute(client, Discord, message) {
    let profileData;
    try {
      profileData = await testModel.findOne({ userID: message.author.id });
      if (!profileData) {
        let profile = testModel.create({
          userID: message.author.id,
          serverID: message.guild.id,
          number: 1000,
        });
        profile.save();
      }
    } catch (err) {
      console.log(err);
    }
  },
};
