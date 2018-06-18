const yargs = require('yargs');

module.exports = (config, callback) => {
  callback(
    yargs
      .config(config)
      .commandDir('cmds')
      .demandCommand(2, 'Please provide at least a folder and a remote folder.')
      .help().argv
  );
};
