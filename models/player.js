const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  team: String,
  avGoals: Number,
  avAssists: Number

}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);
