/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/games', { useUnifiedTopology: true, useNewUrlParser: true });

const gameSchema = new mongoose.Schema({
  id: Number,
  name: String,
  details: String,
  images: [String],
  // videos: [{ name: String, url: String }],
});


const Game = mongoose.model('Game', gameSchema);

const save = (game) => {
  game.save((err, result) => {
    if (err) {
      return (err, null);
    }
    return (null, result);
  });
};

const getGame = (id, cb) => {
  Game.find({ id }, (err, game) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, game);
  });
};

const deleteAll = () => new Promise((resolve, reject) => {
  Game.deleteMany({}, (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});

module.exports = {
  Game,
  save,
  getGame,
  deleteAll,
};
