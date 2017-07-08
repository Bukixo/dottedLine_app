
//////seeds

const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');

const Player = require('../models/player');
const Game = require('../models/games');

mongoose.connect(dbURI);

Player.collection.drop();
Game.collection.drop();

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
}])
.then((players) => {
  console.log(`${players.length} players created!`);
  console.log(players);

  return Game.create([{
    home: {
      name: 'Arsenal',
      game_players: [{ playedBy: players[0],
        data: [{
          game_goals: 4,
          game_assists: 6
        }]
      }, { playedBy: players[1],
        data: [{
          game_goals: 2,
          game_assists: 7
        }]
      }]
    },
    away: {
      name: 'Man U',
      game_players: [{ playedBy: players[2],
        data: [{
          game_goals: 2,
          game_assists: 1
        }]
      }, { playedBy: players[3],
        data: [{
          game_goals: 0,
          game_assists: 10
        }]
      }]
    }
  }]);
})
.then((games) => {
  console.log(`${games.length} games created`);
  console.log(games);
})
.catch((err) => {
  console.log(err);
})
  .finally(() => {
    mongoose.connection.close();
  });


/////game models
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  home: {
    name: String,
    player: { type: mongoose.Schema.ObjectId, ref: 'Player',
      game_goals: Number,
      game_assists: Number
    }
  },
  away: {
    name: String,
    game_players: [
      { playedBy: {type: mongoose.Schema.ObjectId, ref: 'Player', required: true },// turned type, ref & required into an object as I am unable to log 'player[0]' on its own when creating a seeds file. Has to be name: player[0
        data: [{
          game_goals: Number,
          game_assists: Number
        }]
      }
    ]
  }
});

gameSchema.methods.playedBy = function gamePlayedBy(player) {
  if(typeof this.game_players.id === 'string') return this.game_player.id === player.id;
  return player.id === this.game_players.toString();
};

module.exports = mongoose.model('Game', gameSchema);

// name: String,
// age: Number,
// team: String,
// goals: Number,
// assists: Number,
// cleanSheets: Number,
// appearances: Number,
// totalShots: Number,
// shotsOnTarget: Number,
// shotsInBox: Number,
// arielDuals: Number,
// takeOns: Number,
// goalConversionRate: Number,
// totalPasses: Number,
// forwardPasses: Number,
// backwardPasses: Number,
// succesfulPasses: Number,
// chancesCreated: Number,
// keyPasses: Number,
// longBalls: Number,
// crossAccuracy: Number,
// totalTackles: Number,
// tacklesWon: Number,
// defArielDuals: Number,
// fouls: Number,
// tacklesLost: Number,
// defErrors: Number,
// clearances: Number,
// distributionAccuracy: Number,
// punches: Number,
// catches: Number,
// droppedBallFromCatch: Number,
// totalSaves: Number,
// savesFeet: Number,
// savesBottomCorners: Number,
// savesTopCorners: Number,
// yellowCard: Number,
// redCard: Number,
// cardsForDiving: Number,
// cardsForTackle: Number
