const nr = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const faker = require('faker');
const pgtools = require('pgtools');
const { Pool } = require('pg');
const db = require('./database/index.js');
const pgdb = require('./database/pgdb.js');
const config = require('./database/config.js');

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

const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/games/:id', express.static('public'));
app.use(express.json());

let getCounter = 0;

app.get('/api/games/:id', (req, res) => {
  let id = Number(path.basename(req.url));
  if (id < 0 || id > 9999999) {
    id = 1;
  }
  pgdb.getGame(id, (err, result) => {
    if (err) {
      console.log('err');
      res.sendStatus(500);
      res.end();
    } else {
      // console.log(`successful get request number ${getCounter}`);
      getCounter++;
      const newObj = result.rows[0];
      const newImageArr = newObj.images.split('NEXT');
      newImageArr.shift();
      newObj.images = newImageArr;


      res.send([newObj]);
      res.end();
    }
  });
});

// old post req handler===========================================
// app.post('/api/games/:id', (req, res) => {
//   res.sendStatus(200);
//   let ID = Number(path.basename(req.url));
//   if (ID < 0 || ID > 9999999) {
//     ID = 1;
//   }

//   const fillData = () => {
//     const data = [];
//     const newGame = new db.Game({
//       id: ID,
//       name: faker.commerce.productName(),
//       details: faker.lorem.paragraphs(3),
//       images: getRandomImages(),
//     });
//     data.push(newGame);
//     return data;
//   };
//   async function seed() {
//     const data = fillData();
//     for (const game of data) {
//       await db.save(game);
//     }
//     console.log('success');
//   }
//   seed();
// });

let postCounter = 0;

app.post('/api/games/:id', (req, res) => {
  config.pool.connect((err, client, done) => {
    if (err) {
      console.log('error!!!!!: ', err);
    } else {
      res.sendStatus(200);
      const ID = Number(path.basename(req.url));
      const query = `INSERT INTO games22 (name, details, images) VALUES ('${faker.commerce.productName()}', '${faker.lorem.paragraph()}','${getRandomImages()}')`;
      client.query(query, (err, res) => {
        done();
        if (err) {
          console.log(err);
        } else {
          // console.log(`inserted new row! ${postCounter}`);
          postCounter++;
        }
      });
    }
  });
});


app.delete('/api/games/:id', (req, res) => {
  res.sendStatus(200);
  const ID = Number(path.basename(req.url));

  const myquery = { id: ID };

  db.Game.deleteMany(myquery, (err, obj) => {
    if (err) throw err;
    console.log('deleted');
  });
});

app.put('/api/games/:id', (req, res) => {
  res.sendStatus(200);
  const ID = Number(path.basename(req.url));

  const myquery = { id: ID };

  const update = {
    $set: {
      id: ID,
      name: faker.commerce.productName(),
      details: faker.lorem.paragraphs(3),
      images: getRandomImages(),
    },
  };

  const options = { upsert: true };

  db.Game.updateOne(myquery, update, options)
    .then((result) => {
      const { matchedCount, modifiedCount } = result;
      if (matchedCount && modifiedCount) {
        console.log('Successfully updated');
      }
    });
});

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});

module.exports = app;
