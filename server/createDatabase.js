const pgtools = require('pgtools');
const { Pool } = require('pg');
const generateCsv = require('./postgresDataSeed');
const seedPostgres = require('./csvSeed.js');


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


setTimeout(() => {
  pgtools.dropdb(config, 'games22', (err, res) => {
    if (err) {
      // console.log(err);
      console.log('nothing to drop');
    } else {
      console.log('database dropped!');
    }
  });
}, 1000);


function createDatabase() {
  pgtools.createdb(config, 'games22', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      pool.connect()
        .then(() => console.log('connected to pool'));
      console.log('created database!');
      createTable();
    }
  });
}
setTimeout(() => { createDatabase(); }, 2000);


let counter = 0;
function createTable() {
  counter++;
  if (counter === 1) {
    pool.query('CREATE TABLE games22 (id SERIAL PRIMARY KEY, name VARCHAR(100), details varchar(500), images varchar(500))', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('created table!');
        // generateCsv.generateCsv();
        //= =====jumping straight to seeding for now=============
        seedPostgres.seedPostgres();
        //= =====================================================
        // pool.end();
        // process.exit();
      }
    });
  }
}
