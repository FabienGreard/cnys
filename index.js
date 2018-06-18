#!/usr/bin/env node
const { launchServer, launchWatcher } = require('./lib'),
  launchCommand = require('./commands'),
  config = require('./config');

launchCommand(config, config => {
  const server = launchServer(config);
  launchWatcher(server, config);
});
