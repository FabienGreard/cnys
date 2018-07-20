const { createWatcher, watchEvent, watchForceEvent } = require('./watch'),
  { createLocalServer, createRemoteServer } = require('./server'),
  { queueHandler, simpleHandler } = require('./actionsHandler'),
  createProxy = require('./proxy'),
  queue = require('./queue');

// start a server from local or remote
const launchServer = config => {
  const handler = config.url
    ? queueHandler(queue(config), config)
    : simpleHandler;
  const server = config.url
    ? createRemoteServer(config)
    : createLocalServer(config);
  return createProxy(server, handler);
};

// start to watch a local folder
const launchWatcher = (server, config) => {
  const watcher = createWatcher(config);

  // start listening to event
  for (event of config.events) {
    if (!config.remove && (event === 'unlink' || event === 'unlinkDir'))
      continue;
    if (config.force && event === 'ready' && config.url)
      watchEvent(watcher, event, server, true);
    watchEvent(watcher, event, server);
  }
};

module.exports = { launchWatcher, launchServer };
