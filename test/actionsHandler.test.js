const { queueHandler, simpleHandler } = require('../lib/actionsHandler'),
  createProxy = require('../lib/proxy');

describe('actionsHandler', () => {
  const server = { ready: (...args) => {} };

  test('Should create a simple handler', () => {
    expect(simpleHandler).toHaveProperty('set');
  });

  test('Should create a queued handler', () => {
    expect(queueHandler({})).toHaveProperty('set');
  });

  test('Shoud notify with a simple handler', () => {
    const proxy = createProxy(server, simpleHandler);

    try {
      proxy.notify('ready', ['', '']);
    } catch (e) {}
  });

  test('Shoud notify with a queued handler', () => {
    const proxy = createProxy(server, queueHandler({}));

    try {
      proxy.notify('ready', ['', '']);
    } catch (e) {}
  });
});
