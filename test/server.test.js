const createServer = require('../lib/server');

describe('server', () => {
  test('Should create a server', () => {
    const server = createServer('url');
    expect(server).toHaveProperty('connect');
    expect(server).toHaveProperty('upload');
    expect(server).toHaveProperty('remove');
  });
});
