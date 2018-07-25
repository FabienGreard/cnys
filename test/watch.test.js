const watch = require('../lib/watch');

describe('watch', () => {
  let watcher;

  afterAll(() => {
    watcher = null;
  });

  describe('createWatcher', () => {
    test('Should create a watcher', () => {
      watcher = watch.createWatcher({});

      expect(watcher).toHaveProperty('_events');
    });

    test('Should create a watcher with options', () => {
      watcher = watch.createWatcher({ ignored: ['*.md'], url: 'test' });

      expect(watcher).toHaveProperty('_events');
    });
  });

  describe('watchEvent', () => {
    const delay = secondes =>
      new Promise(resolve => setTimeout(resolve, secondes * 1000));

    const server = () => {
      this.event = null;
      return {
        notify: (event, ...rest) => {
          this.event = event;
        },
        getEvent: () => this.event,
        getEventAsync: () => {
          return new Promise(async resolve => {
            await delay(0.1);
            resolve(this.event);
          });
        }
      };
    };

    test('Should attach an event', () => {
      watcher = watch.createWatcher({});
      watch.watchEvent(watcher, 'ready', server());

      expect(watcher._events).toHaveProperty('ready');
    });

    test('Should attach an event and force it', () => {
      watcher = watch.createWatcher({});
      const _server = server();
      watch.watchEvent(watcher, 'ready', _server, true);

      expect(_server.getEvent()).toBe('ready');
    });

    test('Should trigger the watcher', async () => {
      watcher = watch.createWatcher({ source: '../lib' });
      const _server = server();
      watch.watchEvent(watcher, 'ready', _server);

      expect.assertions(1);
      await expect(_server.getEventAsync()).resolves.toBe('ready');
    });
  });
});
