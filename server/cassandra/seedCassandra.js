const cassandra = require('cassandra-driver');
const faker = require('faker');

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

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
});

client.connect((err) => {
  if (err) {
    console.log(err);
  }
});

setTimeout(() => {
  const query = 'INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES (?, ?, ?)';
  const params = ['lala', 'hello', 0.45];
  client.execute(query, params, { prepare: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('inserted!');
    }
    // Inserted in the cluster
  });
}, 3000);


// CREATE KEYSPACE games WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1};

// CREATE TABLE IF NOT EXISTS games.games (id int, name TEXT, details TEXT, images TEXT, PRIMARY KEY (id));

// INSERT INTO games.games (id, name, details, images) VALUES (1,'apples', '0.50', 'jkmhjk');
// INSERT INTO games.games (id, name, details, images) VALUES (2,'bananas', '0.40', 'dsfgsdfg');
// INSERT INTO games.games (id, name, details, images) VALUES (3,'oranges', '0.35', 'sdfgsdf');
// INSERT INTO games.games (id, name, details, images) VALUES (4,'pineapples', '2.5', 'bdfgb');

// // SELECT * FROM games.games;
