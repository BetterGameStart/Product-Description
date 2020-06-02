const pgtools = require('pgtools');
const { Pool } = require('pg');
const generateCsv = require('./postgresDataSeed');
const seedPostgres = require('./csvSeed.js');
const config = require('./database/config.js');
/*
setTimeout(() => {
console.log('hello?');
  pgtools.dropdb(config.config, 'games22', (err, res) => {
console.log('hi?');
    if (err) {
      // console.log(err);
      console.log('nothing to drop');
    } else {
      console.log('database dropped!');
    }
  });
}, 1000);
*/

function createDatabase() {
console.log('hello?');
  pgtools.createdb(config.config, 'games22', (err, res) => {
console.log('hi?');
    if (err) {
      console.log(err);
    } else {
      config.pool.connect()
        .then(() => console.log('connected to config.pool'));
      console.log('created database!');
      createTable();
    }
  });
}
setTimeout(() => { createDatabase(); }, 10000);


let counter = 0;
function createTable() {
  counter++;
  if (counter === 1) {
    config.pool.query('CREATE TABLE games22 (id SERIAL PRIMARY KEY, name VARCHAR(100), details varchar(500), images varchar(500))', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('created table!');
        // generateCsv.generateCsv();
        //= =====jumping straight to seeding for now=============
        seedPostgres.seedPostgres();
        //= =====================================================
        // config.pool.end();
        // process.exit();
      }
    });
  }
}
