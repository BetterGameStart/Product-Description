
module.exports = {
  generateRandomData,
  getRandomPage,
};

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

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const name = faker.commerce.productName();
  const details = faker.lorem.paragraph();
  const images = getRandomImages();
  // add variables to virtual user's context:
  userContext.vars.name = name;
  userContext.vars.details = details;
  userContext.vars.images = images;
  // continue with executing the scenario:
  return done();
}

function getRandomPage(userContext, events, done) {
  // generate data with Faker:
  const id = Math.floor(getRandomArbitrary(1, 10000000));
  // add variables to virtual user's context:
  userContext.vars.id = id;
  // continue with executing the scenario:
  return done();
}
