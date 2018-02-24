module.exports = function fuzzy(dataSet = [], input) {
  if (!input) {
    return dataSet;
  }

  const parsed = dataSet.map((i) => i.toLowerCase());

  return parsed.filter((data) => {
    return data.includes(input.toLowerCase());
  })
}
