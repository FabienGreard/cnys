const client = require('../lib/client');

describe('client', () => {
  const cnx = { username: '', password: '' };
  const options = { verbose: false, debug: false };

  test('Should create a basic connection', () => {
    client.createConnection(
      cnx,
      (co, config) => {
        console.log(co, config);
      },
      options
    );
  });

  test('Should create a netcat connection', () => {
    //not yet implemented
  });

  test('Should create a directory', () => {
    //not yet implemented
  });

  test('Should copy file from local to remote', () => {
    //not yet implemented
  });

  test('Should read from a directory', () => {
    //not yet implemented
  });
});
