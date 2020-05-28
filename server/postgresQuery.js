const pgtools = require('pgtools');
const { Pool } = require('pg');
const faker = require('faker');

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

let i = 0;
let start;

pool.connect();

function query() {
  pool.query('SELECT * FROM games22 where id = 9900000', (error, results) => {
    if (i === 0) {
      start = new Date().getTime();
    }
    i++;
    if (error) {
      throw error;
    }
    if (i === 99999) {
      const elapsed = new Date().getTime() - start;
      console.log(`Queries made: ${i}`);
      console.log('time elapsed: ', `${elapsed} milliseconds`);
      process.exit();
    }
  });
}
for (let j = 0; j < 100000; j++) {
  query();
}
