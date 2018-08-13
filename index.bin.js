#!/usr/bin/env node
process.env.NODE_ENV = 'startup';

const { launchServer, launchWatcher } = require('./lib'),
  { debug } = require('./lib/display'),
  launchCommand = require('./commands'),
  { stepByStepCmd } = require('./helpers'),
  config = require('./config');

launchCommand(config, async config => {
  config = config.stepByStep ? await stepByStepCmd(config) : config;
  process.env.NODE_ENV = '';
  debug(config.debug, config);
  const server = launchServer(config);
  launchWatcher(server, config);
});
