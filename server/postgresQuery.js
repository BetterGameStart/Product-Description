const pgtools = require('pgtools');
const { Pool } = require('pg');
const faker = require('faker');
const config = require('./database/config.js');

let i = 0;
let start;

config.pool.connect();

function query() {
  config.pool.query('SELECT * FROM games22 where name LIKE "1234567899%"', (error, results) => {
    if (i === 0) {
      start = new Date().getTime();
    }
    i++;
    if (error) {
      throw error;
    }
    if (i === 99) {
      const elapsed = new Date().getTime() - start;
      console.log(`Queries made: ${i}`);
      console.log('time elapsed: ', `${elapsed} milliseconds`);
      process.exit();
    }
  });
}
for (let j = 0; j < 100; j++) {
  query();
}
