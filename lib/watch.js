const sane = require('sane'),
  path = require('path');

const watchEvent = (watcher, event, server) => {
  watcher.on(event, (...args) => server.notify(event, args));
};

const createWatcher = config => {
  const { folder, glob, ignored } = config;
  let options = {};

  //check if glob, ignored are not null (use default sane instead)
  if (glob && glob[0]) options = { ...options, glob };
  if (ignored && ignored[0]) options = { ...options, glob };

  return sane(path.join(__dirname, `../${folder}`), options);
};

module.exports = { createWatcher, watchEvent };
