const { createWatcher, watchEvent, watchForceEvent } = require('./watch'),
  { createLocalServer, createRemoteServer } = require('./server'),
  handler = require('./actionsHandler'),
  createProxy = require('./proxy');

// start a server from local or remote
const launchServer = config => {
  const server = config.url
    ? createRemoteServer(config)
    : createLocalServer(config);
  return createProxy(server, simpleHandler);
};

// start to watch a local folder
const launchWatcher = (server, config) => {
  const watcher = createWatcher(config);

  // start listening to event
  for (event of config.events) {
    if (!config.remove && (event === 'unlink' || event === 'unlinkDir'))
      continue;
    if (config.force && event === 'ready')
      watchEvent(watcher, event, server, true);
    watchEvent(watcher, event, server);
  }
};

module.exports = { launchWatcher, launchServer };
