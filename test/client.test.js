const { createConnection, createFileFromLocal } = require('../lib/client');

describe('client', () => {
  const connect = {
    host: '',
    username: '',
    ncUrl: '',
    password: '',
    privateKey: ''
  };

  const config = { verbose: false, debug: false };

  test('Should create a basic connection', async () => {
    //not yet implemented
    //await createConnection(connect, co => {}, { config}
  });

  test('Should create a netcat connection', async () => {
    //not yet implemented
    //await createConnection(connect, co => {}, { config}
  });
});
