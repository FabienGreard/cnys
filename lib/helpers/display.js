module.exports = loadingBar => (config, display) => {
  if (process.env.NODE_ENV !== 'test') {
    if (config.verbose) console.log(`----- ${display} -----`);
    else loadingBar.showBar();
  }
};
