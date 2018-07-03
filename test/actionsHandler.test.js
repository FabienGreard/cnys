const actionsHandler = require('../lib/actionsHandler'),
  createProxy = require('../lib/proxy');

describe('actionsHandler', () => {
  const server = { ready: (...args) => {} };

  test('Should create and handler', () => {
    expect(actionsHandler).toHaveProperty('set');
  });

  test('Shoud notify', () => {
    const proxy = createProxy(server, actionsHandler);

    try {
      proxy.notify('ready', ['', '']);
    } catch (e) {}
  });
});
