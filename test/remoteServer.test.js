const { createRemoteServer } = require('../lib/servers');

describe('server', () => {
  test('Should create a server', () => {
    const server = createRemoteServer('url');
    expect(server).toHaveProperty('add');
    expect(server).toHaveProperty('addDir');
    expect(server).toHaveProperty('change');
    expect(server).toHaveProperty('ready');
    expect(server).toHaveProperty('unlink');
    expect(server).toHaveProperty('unlinkDir');
  });
});
