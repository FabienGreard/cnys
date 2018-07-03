const watch = require('../lib/watch');

describe('watch', () => {
  let watcher;

  afterAll(() => {
    watcher = null;
  });

  test('Should create a watcher', () => {
    watcher = watch.createWatcher({});

    expect(watcher).toHaveProperty('_events');
  });

  test('Should create a watcher with options', () => {
    watcher = watch.createWatcher({ ignored: ['*.md'] });

    expect(watcher).toHaveProperty('_events');
  });

  test('Should attach event', () => {
    watcher = watch.createWatcher({});

    const server = { notify: () => {} };

    watch.watchEvent(watcher, 'ready', server);

    expect(watcher._events).toHaveProperty('ready');
  });
});
