const fs = require('fs');
const fastcsv = require('fast-csv');
const { Pool } = require('pg');
const faker = require('faker');
const path = require('path');
const config = require('./database/config.js');

let imageCounter = 1;
let refreshCounter = 0;

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

let currentRow = 0;
const idCounter = 0;

function seedPostgres() {
console.log('seeding...');
/*
setTimeout(() => {
refreshCounter++;
console.log('refresh number ' + refreshCounter + ' / 200');
seedPostgres();
return;
}, 180000)
*/
  const stream = fs.createReadStream(path.join(__dirname, '/../games.csv'));
  const csvData = [];
  const csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvData.push(data);
    })
    .on('end', () => {
      // remove the first line: header
      csvData.shift();

      let counter = 0;
      function loop() {
        config.pool.connect((err, client, done) => {
          if (err) {
 console.log('error?: ', err)
}
            for (let i = 0; i < 5000; i++) {
function miniSeed () {
              const query = `INSERT INTO games22 (name, details, images) VALUES ('${faker.commerce.productName()}', '${faker.lorem.paragraph()}','${getRandomImages()}')`;
              client.query(query, (err, res) => {
                currentRow++;
                if (err) {
                  console.log('error!!!: ', err);
return;
                } else {
                  if (currentRow % 10000 === 0) {
                    counter++;
                    console.log(`${counter}/1000 done seeding...`);
                  }
miniSeed();
/*
if(Number(counter)/1000 === 5) {
console.log('refreshing...');
if(refreshCounter < 200) {
console.log(refreshCounter + ' / 200 done seeding');
refreshCounter++;
seedPostgres();
return;
} else {
console.log('done seeding!');
process.exit();
}
}
*/
                  if (i === 4999) {
                    loop();
                  }
                  if (currentRow === 9999999) {
                    console.log('DONE SEEDING!!!');
                    process.exit();
                  }

                }
              });
            }
miniSeed();
}
          // csvData.forEach((row) => {
          //   client.query(query, row, (err, res) => {
          //     if (err) {
          //       console.log(err);
          //     } else {
          //       console.log(`inserted ${res.rowCount} row:`, row[0]);
          //       if (row[0].toString() === '5000') {
          //         loop();
          //       }
          //     }
          //   });
          // });
        
        
          
        });
      }
      loop();
    });

  stream.pipe(csvStream);
}
seedPostgres();
module.exports = {
  seedPostgres,
};
