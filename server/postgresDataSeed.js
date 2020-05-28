const faker = require('faker');
const fs = require('fs');
const seedPostgres = require('./csvSeed.js');


function generateCsv() {
  const writeGames = fs.createWriteStream('games.csv');
  writeGames.write('id,name,details,images\n', 'utf8');

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

  function writeTenMillionUsers(writer, encoding, callback) {
    let i = 10000000;
    let id = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        id += 1;
        const name = faker.commerce.productName();
        const details = faker.commerce.productName();
        const images = getRandomImages();
        const data = `${i},${name},${details},${images}\n`;
        if (i % 100000 === 0) {
          console.log('when this gets to 0 the data is done generating: ', i / 100000);
        }

        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
      // had to stop early!
      // write some more once it drains
        writer.once('drain', write);
      }
    }
    write();
  }

  writeTenMillionUsers(writeGames, 'utf-8', () => {
    writeGames.end();
    seedPostgres.seedPostgres();
  });
}

module.exports = {
  generateCsv,
};
