const pgtools = require('pgtools');
const { Pool } = require('pg');
const faker = require('faker');
const pool = require('./pool.js');

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'samaung1',
  port: 5432,
};

let imageCounter = 1;
const getRandomImages = () => {
  const results = [];
  const limit = faker.random.number({ min: 4, max: 7 });

  for (let j = 0; j < limit; j += 1) {
    const imgURL = `https://aragorn-images.s3-us-west-2.amazonaws.com/${imageCounter}.jpg`;
    results.push(imgURL);
    imageCounter += 1;
    if (imageCounter > 30) {
      imageCounter = 1;
    }
  }
  return results;
};

let count = 1;

function createDatabase() {
  pgtools.createdb(config, 'games', (err, res) => {
    if (err) {
      console.log('database already exists! - dropping database!');
      pgtools.dropdb(config, 'games', (err, res) => {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        count++;
        createDatabase();
      });
    }
    setTimeout(() => {
      console.log('created database!');
      createTable();
    }, 3000);
  });
}
if (count === 1) {
  count++;
  createDatabase();
}

function createTable() {
  pool.pool.query('CREATE TABLE games (id varchar(10), name VARCHAR(100), details varchar(3000), images varchar(500))', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('created table!');
      seed();
      pool.end();
    }
  });
}


function seed() {
  for (let i = 0; i < 1000; i++) {
    const query = `INSERT INTO games VALUES ('${i}', '${faker.commerce.productName()}', '${faker.lorem.paragraphs(3)}', '${getRandomImages()}')`;
    pool.pool.query(query, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
    if (i === 999) {
      console.log('done seeding');
      queryAll();
      // process.exit();
    }
  }
}
seed();

function queryAll() {
  pool.pool.query('SELECT * FROM games', (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    process.exit();
  });
}
// queryAll();
