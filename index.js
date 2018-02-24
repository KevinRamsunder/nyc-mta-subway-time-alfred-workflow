const fs = require('fs');
const alfy = require('alfy');
const fuzzy = require('fuzzy');

// const apiMethods = require('./src/api.js');

const stations = JSON.parse(fs.readFileSync('flatten.json'));
const results = fuzzy.filter(alfy.input, stations, { extract: (i) => i.name });

const output = results.map((result) => {
  return {
    title: result.original.name,
    subtitle: result.original.borough,
    icon: {path: `images/${result.original.line.toUpperCase()}.png`},
    arg: `http://subwaytime.mta.info/index.html#/app/subwaytime/${result.original.id[0]}/${result.original.id}/`
  };
});

// console.log(output);

alfy.output(output);
