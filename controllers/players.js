const Player = require('../models/player');

function indexPlayer(req, res, next){
  Player
    .find()
    .then((players) => res.json(players))
    .catch(next);
}

function createPlayer(req, res, next){
  Player
    .create(req.body)
    .then((player) => res.status(201).json(player))
    .catch(next);
}

function showPlayer(req, res, next){
  Player
    .findById(req.params.id)
    .then((player) =>{
      if(!player) return res.notFound();
      res.json(player);
    })
    .catch(next);
}

function updatePlayer(req, res, next){
  Player
    .findById(req.params.id)
    .then((player) => {
      if(!player) return res.notFound();

      for(const field in req.body) {
        player[field] = req.body[field];
      }
      return player.save();
    })
    .then((player) => res.json(player))
    .catch(next);
}

function deletePlayer(req, res, next){
  Player
    .findById(req.params.id)
    .then((player) => {
      if(!player) return res.notFound();
      return player.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexPlayer,
  create: createPlayer,
  show: showPlayer,
  update: updatePlayer,
  delete: deletePlayer
};
