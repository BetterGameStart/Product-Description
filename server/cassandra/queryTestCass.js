const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
});
client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to cassandra database!');
    query();
  }
});

let i = 0;
let start;

function query() {
  const query = 'SELECT * FROM games.games5 where id = 9900000';
  client.execute(query, (error, results) => {
    if (i === 0) {
      start = new Date().getTime();
    }
    i++;
    if (error) {
      throw error;
    }
    if (i === 9999) {
      const elapsed = new Date().getTime() - start;
      console.log(`Queries made: ${i}`);
      console.log('time elapsed: ', `${elapsed} milliseconds`);
      process.exit();
    }
  });
}
for (let j = 0; j < 10000; j++) {
  query();
}
