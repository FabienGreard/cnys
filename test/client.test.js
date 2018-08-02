const { createConnection, createFileFromLocal } = require('../lib/client');

jest.mock('../lib/client');

describe('client', () => {
  const connect = {
    host: '',
    username: '',
    ncUrl: '',
    password: '',
    privateKey: ''
  };

  const config = { verbose: false, debug: false };

  const fn = co => {};

  const fnWithCmds = async co => {
    await createFileFromLocal({}, '', '');
  };

  test('Should create a basic connection', async () => {
    await createConnection(connect, fn, config);
    expect(createConnection).toHaveBeenCalledWith(connect, fn, config);
  });

  test('Should create a netcat connection', async () => {
    await createConnection({ ...connect, ncUrl: '192.168.10.2' }, fn, config);
    expect(createConnection).toHaveBeenCalledWith(
      { ...connect, ncUrl: '192.168.10.2' },
      fn,
      config
    );
  });

  test('Should create a connection with commands', async () => {
    await createConnection(
      { ...connect, ncUrl: '192.168.10.2' },
      fnWithCmds,
      config
    );
    expect(createConnection).toHaveBeenCalledWith(
      { ...connect, ncUrl: '192.168.10.2' },
      fnWithCmds,
      config
    );
  });
});
