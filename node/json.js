const fs = require('fs');
const request = require('request');
const apiMethods = require('../src/api.js');

const promises = [];

const lines = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  'A',
  'C',
  'E',
  'G',
  'B',
  'D',
  'F',
  'M',
  'J',
  'Z',
  'L',
  'S',
  'N',
  'Q',
  'R',
  'W',
  'SIR'
];

lines.forEach((line) => {
  promises.push(new Promise((resolve, reject) => {
    const baseEndpoint = 'http://traintimelb-367443097.us-east-1.elb.amazonaws.com';
    const endpoint = `${baseEndpoint}/getStationsByLine/${line}`;
    request({ url: endpoint, json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.stringify(JSON.parse(body).map((b) => {
          return Object.assign({}, b, {line});
        })));
      }
    });
  }));
});

Promise.all(promises).then((result) => {
  process(result);
}).catch((error) => {
  console.log('error', error);
});

const boroughs = {};

const process = (stations) => {
  stations.forEach((station) => {
    const parsed = JSON.parse(station);
    parsed.forEach((boroughObject) => {
      const place = boroughObject.borough.trim().toUpperCase();

      if (boroughs[place] === undefined) {
        boroughs[place] = [];
      }

      // boroughs[place].push(...boroughObject.stations);
      boroughs[place].push(...boroughObject.stations.map((q) => { return { ...q, line: boroughObject.line}}));
    });
  });


  const flat = [];
  Object.keys(boroughs).forEach((key) => {
    const stations = boroughs[key].map((each) => { return { ...each, borough: key}});
    flat.push(...stations);
  });

  fs.writeFileSync('flatten.json', JSON.stringify(flat, null, 2));
}
