const pathModule = require('path');

const queueHandler = (queue, config) => {
  return {
    set: (obj, key, value) => {
      const file = value.args[0],
        stats = value.args[1];

      // number of action it take
      const running = value.action === 'ready' ? config.concurrency : 1;

      const actionName =
        value.action === 'ready'
          ? 'INITIALIZATION'
          : `${value.action.toUpperCase()} -- ${file}`;

      queue.push(
        actionName,
        done => {
          return new Promise(async resolve => {
            await obj[value.action](file, stats);
            resolve(done(running));
          });
        },
        running
      );
    }
  };
};

const simpleHandler = {
  set: async (obj, key, value) => {
    const file = value.args[0],
      stats = value.args[1];

    await obj[value.action](file, stats);
  }
};

module.exports = { queueHandler, simpleHandler };
