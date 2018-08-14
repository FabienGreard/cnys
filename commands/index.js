const yargs = require('yargs');

module.exports = (config, callback) => {
  callback(
    yargs
      .config(config)
      .commandDir('cmds')
      .demandCommand(2, 'Missing arguments.')
      .help().argv
  );
};
