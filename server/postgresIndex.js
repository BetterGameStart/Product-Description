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
  database: 'games',
  password: 'samaung1',
  port: 5432,
});

// =========== create database 'games' ===================================================
const bigCounter = 0;
let seedDone = 0;

function createDatabase() {
  pgtools.createdb(config, 'games', (err, res) => {
    if (err) {
      console.log('database already exists! - dropping database!');
      pgtools.dropdb(config, 'games', (err, res) => {
        if (err) {
          console.error(err);
          process.exit(-1);
        }
        createDatabase();
      });
    }
    setTimeout(() => {
      pool.connect()
        .then(() => console.log('connected'))
        .then(() => createTable())
        .then(() => {
          for (let i = 0; i < 1000; i++) {
            seed();
            console.log(`${i} - when this hits 1000 it will begin seeding...`);
          }
        })
        .then(() => {
          seedDone++;
          console.log('done');
          if (seedDone === 2) {
            process.exit();
          }
        });
      console.log('created database!');
    // createTable();
    }, 3000);
  });
}
createDatabase();
let county = 0;

function seed() {
  // for (let j = 0; j < 1000; j++) {
  for (let i = 0; i < 10000; i++) {
    const query = `INSERT INTO games VALUES ('${i}', '${faker.commerce.productName()}', '${faker.lorem.paragraphs(3)}', '${getRandomImages()}');`;
    pool.query(query, (err, res) => {
      if (i === 9999) {
        county++;
        console.log(`${county}/1000 done seeding...this may take a while...`);
      }
      if (err) {
        console.log(err);
      }
    });
  }
  // console.log(j);
}
// }

// // // // // // ========================================================================================


// // // // // //= ============ create table 'games' ==================================================
function createTable() {
  pool.query('CREATE TABLE games (id varchar(10), name VARCHAR(100), details varchar(3000), images varchar(500))', (err, res) => {
    if (err) {
      console.log(err);
      pool.end();
    } else {
      console.log('created table!');
      // seed();
      // pool.end();
    }
  });
}
// // // // //= ===================================================================================

// // // // const data = [];

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
// // // //= ============ generate data ==============================================================
// // // let generateCounter = 1;
// // // function generateData() {
// // //   for (let i = 0; i < 10000000; i++) {
// // //     const obj = {
// // //       id: i, name: faker.commerce.productName(), details: faker.lorem.paragraphs(3), images: getRandomImages(),
// // //     };
// // //     data.push(obj);
// // //     if (i % 100000 === 0) {
// // //       console.log(`${generateCounter}% ` + 'done generating data');
// // //       generateCounter++;
// // //     }
// // //     if (i === 9999999) {
// // //       console.log('data generation complete!');
// // //       break;
// // //     }
// // //   }
// // //   seed();
// // // }
// // // //= =======================================================================================

// // // //= =================================== seed ==============================================
// let counter = 1;
// function seed() {
//   for (let i = 0; i < 100000; i++) {
//     const query = `INSERT INTO games VALUES ('${i}', '${faker.commerce.productName()}', '${faker.lorem.paragraphs(3)}', '${getRandomImages()}');`;
//     pool.query(query, (err, res) => {
//       console.log('hi');
//       if (err) {
//         console.log(err);
//       }
//     });
//     if (i === 99999) {
//       console.log(`${counter}% ` + 'done seeding');
//       counter++;
//       if (counter < 100) {
//         seed();
//       } else {
//         pool.end();
//         console.log('done seeding!!!');
//         // queryAll(); // if you want to query to make sure it worked correctly afterwards, remember to uncomment the function.
//       }
//     }
//   }
// }
// //= =====================================================================================

//= ================== query all =======================================================
// pool.connect();
function queryAll() {
  pool.query('SELECT * FROM games', (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
  });
}
// queryAll();
//= ====================================================================================
