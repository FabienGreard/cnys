const createProxy = require('../lib/proxy'),
  handler = require('../lib/actionsHandler');

describe('proxy', () => {
  const server = { ready: (...args) => {} };

  test('Should createProxy', () => {
    const proxy = createProxy(server);
    expect(proxy).toHaveProperty('notify');
  });

  test('Attach an handler', () => {
    const proxy = createProxy(server, handler);

    try {
      proxy.notify('ready', ['', '']);
    } catch (e) {}
  });
});
