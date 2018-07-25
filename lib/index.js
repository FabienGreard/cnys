const { createWatcher, watchEvent } = require('./watch'),
  { createLocalServer, createRemoteServer } = require('./server'),
  handler = require('./actionsHandler'),
  createProxy = require('./proxy'),
  queue = require('./queue');

// start a server from local or remote
const launchServer = config => {
  const _handler = handler(queue(config), config);
  const server = config.url
    ? createRemoteServer(config)
    : createLocalServer(config);
  return createProxy(server, _handler);
};

// start to watch a local folder
const launchWatcher = (server, config) => {
  const watcher = createWatcher(config);

  // start listening to event
  for (event of config.events) {
    if (!config.remove && (event === 'unlink' || event === 'unlinkDir'))
      continue;
    if (event === 'ready') watchEvent(watcher, event, server, true);
    else watchEvent(watcher, event, server);
  }
};

module.exports = { launchWatcher, launchServer };
