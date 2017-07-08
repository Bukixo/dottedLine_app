const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');

const Player = require('../models/player');

mongoose.connect(dbURI);

Player.collection.drop();

Player.create([{
  name: 'Alex',
  age: 23,
  team: 'Arsenal',
  avGoals: '3',
  avAssists: '4'
}, {
  name: 'John',
  age: 19,
  team: 'Arsenal',
  avGoals: '7',
  avAssists: '2'
},{
  name: 'Joe',
  age: 26,
  team: 'Man U',
  avGoals: '1',
  avAssists: '7'
},{
  name: 'Ronaldo',
  age: 22,
  team: 'Man U',
  avGoals: '3',
  avAssists: '16'
}], (err, players) => {
  if(err)console.log(err);
  if(players)console.log(`${players.length} players created!`);

  mongoose.connection.close();
});
