module.exports = secondes =>
  new Promise(resolve => setTimeout(resolve, secondes * 1000));
