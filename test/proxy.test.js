const createProxy = require('../lib/proxy');

describe('proxy', () => {
  const server = { ready: (...args) => {} };

  test('Should createProxy', () => {
    const proxy = createProxy(server);
    expect(proxy).toHaveProperty('notify');
  });

  test('Attach an handler', () => {
    const proxy = createProxy(server, { set: (...args) => {} });

    try {
      proxy.notify('ready', ['', '']);
    } catch (e) {}
  });
});
