#!/usr/bin/env node

const { launchServer, launchWatcher } = require('./lib'),
  { debug } = require('./lib/display'),
  launchCommand = require('./commands'),
  config = require('./config');

launchCommand(config, config => {
  //config = config.stepByStep ? await stepByStepCmd(config) : config;
  debug(config.debug, config);
  const server = launchServer(config);
  launchWatcher(server, config);
});
