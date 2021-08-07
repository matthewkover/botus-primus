const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  number: { type: Number, default: 1000 },
});

const model = mongoose.model("TestModels", testSchema);

module.exports = model;
