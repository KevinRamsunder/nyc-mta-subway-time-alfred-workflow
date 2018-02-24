const request = require('request');

const baseEndpoint = 'http://traintimelb-367443097.us-east-1.elb.amazonaws.com';

function getSubwayLines() {
  const endpoint = `${baseEndpoint}/getSubwaylines/`;

  return new Promise((resolve, reject) => {
    request({ url: endpoint, json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

function getStationsByLine() {
  const endpoint = `${baseEndpoint}/getStationsByLine/`;

  return new Promise((resolve, reject) => {
    request({ url: endpoint, json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

module.exports = {
  getSubwayLines,
  getStationsByLine
}
