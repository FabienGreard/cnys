const { createWatcher, watchEvent } = require('./watch'),
  createProxy = require('./proxy'),
  { createLocalServer, createRemoteServer } = require('./server'),
  handler = require('./actionsHandler');

// start a server from local or remote
const launchServer = config => {
  const server = config.url
    ? createRemoteServer(config)
    : createLocalServer(config);
  return createProxy(server, handler);
};

// start to watch a local folder
const launchWatcher = (server, config) => {
  const watcher = createWatcher(config);

  // start listening to event
  for (event of ['ready', 'change', 'add', 'delete']) {
    if (config.remove === false && event === 'delete') continue;
    watchEvent(watcher, event, server);
  }
};

module.exports = { launchWatcher, launchServer };
