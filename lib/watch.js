const chokidar = require('chokidar'),
  path = require('path');

const watchEvent = (watcher, event, server, force = false) => {
  if (force) server.notify(event, []);
  else watcher.on(event, (...args) => server.notify(event, args));
};

const createWatcher = config => {
  const { ignored } = config,
    source = path.join(`${process.cwd()}/${config.source}`);
  let options = {
    ignoreInitial: true,
    ignored: [`${source}/*.cnys.tar`],
    awaitWriteFinish: config.url ? true : false,
    persistent: false
  };

  //check if glob, ignored are not null (use default chokodar instead)
  if (ignored && ignored[0]) {
    options = {
      ...options,
      ignored: ignored.reduce(
        (ac, cv) => [...ac, `${source}/${cv}`],
        options.ignored
      )
    };
  }

  return chokidar.watch(source, options);
};

module.exports = { createWatcher, watchEvent };
