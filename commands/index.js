const yargs = require('yargs');

module.exports = (config, callback) => {
  callback(
    yargs
      .config(config)
      .commandDir('cmds')
      .help().argv
  );
};
