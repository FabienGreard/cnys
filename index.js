const { launchServer, launchWatcher } = require('./lib'),
  { debug } = require('./lib/display'),
  launchCommand = require('./commands'),
  config = require('./config');

module.exports = config => {
  debug(config.debug, config);
  const server = launchServer(config);
  launchWatcher(server, config);
};
