const pgtools = require('pgtools');
const { Pool } = require('pg');

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'samaung1',
  port: 5432,
};

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'games22',
  password: 'samaung1',
  port: 5432,
});

pool.connect();

// refactor
const save = (game) => {
  game.save((err, result) => {
    if (err) {
      return (err, null);
    }
    return (null, result);
  });
};

// refactor
// const getGame = (id, cb) => {
//   Game.find({ id }, (err, game) => {
//     if (err) {
//       return cb(err, null);
//     }
//     return cb(null, game);
//   });
// };


const getGame = (id, cb) => {
  pool.query(`SELECT * FROM games22 where id = ${id}`, (err, res) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, res);
  });
};


// refactor
const deleteAll = () => new Promise((resolve, reject) => {
  Game.deleteMany({}, (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve();
  });
});

// function query() {
//   pool.query('SELECT * FROM games22 where id = 9900000', (error, results) => {
//     if (i === 0) {
//       start = new Date().getTime();
//     }
//     i++;
//     if (error) {
//       throw error;
//     }
//     if (i === 99999) {
//       const elapsed = new Date().getTime() - start;
//       console.log(`Queries made: ${i}`);
//       console.log('time elapsed: ', `${elapsed} milliseconds`);
//       process.exit();
//     }
//   });
// }
// for (let j = 0; j < 100000; j++) {
//   query();
// }

module.exports = {
  save,
  getGame,
  deleteAll,
};
