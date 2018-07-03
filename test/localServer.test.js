const { createLocalServer } = require('../lib/server');

describe('server', () => {
  test('Should create a server', () => {
    const server = createLocalServer('url');
    expect(server).toHaveProperty('ready');
  });
});
