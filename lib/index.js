const { createWatcher, watchEvent, watchForceEvent } = require('./watch'),
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
  for (event of ['ready', 'change', 'add', 'addDir', 'unlink', 'unlinkDir']) {
    if (!config.remove && (event === 'unlink' || event === 'unlinkDir'))
      continue;
    if (config.force && event === 'ready')
      watchEvent(watcher, event, server, true);
    watchEvent(watcher, event, server);
  }
};

module.exports = { launchWatcher, launchServer };
