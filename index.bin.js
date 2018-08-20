#!/usr/bin/env node
process.stdout.write('\033c\033[3J');

const { launchServer, launchWatcher } = require('./lib'),
  { debug } = require('./lib/display'),
  launchCommand = require('./commands'),
  config = require('./config');

launchCommand(config, config => {
  debug(config.debug, config);
  const server = launchServer(config);
  launchWatcher(server, config);
});
