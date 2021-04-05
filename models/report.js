const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  authorName: String,
  authorID: String,
  createdDate: Date,
  eventDate: Date,
  eventDescription: String,
  usersAccepted: Array,
  usersTentative: Array,
  usersDeclined: Array,
});

module.exports;
