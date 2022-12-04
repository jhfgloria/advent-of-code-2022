const https = require('https');
const { readFile } = require('fs/promises');

const options = day => ({
  host: 'adventofcode.com',
  port: 443,
  path: `/2022/day/${day}/input`,
  headers: {
    cookie: 'session=53616c7465645f5ff387fc4a16c3c23233346a333442a9a3aff0aeab3a5209e52f87a20094565cad14fb0c02ed5e88d0d05ee61d672c0505fadc9f18f2d60417',
  },
});

function getExercise(day, local = false) {
  if (local) {
    return readFile(`./day${day}.example.txt`, { encoding: 'utf8' })
  } else {
    return new Promise(resolve => {
      https.get(options(day), res => {
        res.on('data', buffer => resolve(buffer.toString()));
      });
    })
  }
}

module.exports = {
  getExercise,
};
