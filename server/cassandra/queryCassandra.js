const cassandra = require('cassandra-driver');
const faker = require('faker');

let counter = 2000000;
let counter1000 = 2001001;
let asyncCounter = 0;


function asyncSeed() {
  let imageCounter = 1;

  const getRandomImages = () => {
    let results = '';
    const limit = faker.random.number({ min: 4, max: 7 });

    for (let j = 0; j < limit; j += 1) {
      const imgURL = `https://aragorn-images.s3-us-west-2.amazonaws.com/${imageCounter}.jpg`;
      results += `NEXT${imgURL}`;
      imageCounter += 1;
      if (imageCounter > 30) {
        imageCounter = 1;
      }
    }
    return results;
  };


  const connectCounter = 0;


  function connectAndSeed() {
    const client = new cassandra.Client({
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
    });
    client.connect((err) => {
      if (err) {
        console.log(err);
      } else {
      // console.log('connected to cassandra database!');
        seed();
      }
    });


    function seed() {
      for (let i = counter; i < counter1000; i++) {
        const query = `INSERT INTO games.games5 (id, name, details, images) VALUES (${i}, '${faker.commerce.productName()}', '${faker.lorem.paragraph()}','${getRandomImages()}')`;

        client.execute(query, { prepare: true }, (err) => {
          counter++;
          if (err) {
            console.log(err);
            process.exit();
          } else if (counter === counter1000 - 1) {
            // console.log('adding counter');
            asyncCounter++;
            counter1000 += 1000;
            // console.log('new counter1000: ', counter1000);
            // console.log('counter: ', counter);
            if (asyncCounter === 10001) {
              console.log('done seeding!!!');
              process.exit();
            } else {
              if (asyncCounter % 1000 === 0) {
                setTimeout(asyncSeed, 5000);
              } else {
                asyncSeed();
              }
              if (asyncCounter % 100 === 0) {
                console.log(`${asyncCounter / 100}% done seeding`);
              }
            }
          }
        });
      }
    }
  }
  connectAndSeed();
}
asyncSeed();


// CREATE KEYSPACE games5 WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1};

// CREATE TABLE IF NOT EXISTS games.games5 (id int, name TEXT, details TEXT, images TEXT, PRIMARY KEY (id));

// INSERT INTO games.games (id, name, details, images) VALUES (1,'apples', '0.50', 'jkmhjk');
// INSERT INTO games.games (id, name, details, images) VALUES (2,'bananas', '0.40', 'dsfgsdfg');
// INSERT INTO games.games (id, name, details, images) VALUES (3,'oranges', '0.35', 'sdfgsdf');
// INSERT INTO games.games (id, name, details, images) VALUES (4,'pineapples', '2.5', 'bdfgb');

// // SELECT * FROM games.games5;
