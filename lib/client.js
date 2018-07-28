const ssh2 = require('ssh2'),
  { verbose, debug } = require('./display');

// Create a basic connection
const createBasicConnection = (connect, commands, config) => {
  return new Promise(resolve => {
    const conn1 = new ssh2.Client();

    conn1
      .on('ready', async () => {
        verbose(config.verbose, 'connection start');
        try {
          await commands(conn2);
        } catch (e) {
          debug(config.debug, e);
        }
      })
      .on('close', () => {
        verbose(config.verbose, 'connection end');
        resolve();
      })
      .connect(connect);
  });
};

// Create a netcat connection
const createNcConnection = (connect, commands, config) => {
  return new Promise(resolve => {
    const conn1 = new ssh2.Client();
    const conn2 = new ssh2.Client();

    conn1
      .on('ready', () => {
        verbose(config.verbose, 'connection start');
        conn1.exec(`nc ${connect.ncUrl} 22`, (err, stream) => {
          if (err) conn1.end();
          conn2.connect({ sock: stream, ...connect });
        });
      })
      .on('close', () => {
        verbose(config.verbose, 'connection end');
        resolve();
      })
      .connect(connect);

    conn2
      .on('ready', async () => {
        try {
          await commands(conn2);
        } catch (e) {
          debug(config.debug, e);
        }
      })
      .on('close', () => conn1.end());
  });
};

// Switch beween netcat or basic connection
const createConnection = async (connect, commands, config) => {
  if (!connect.ncUrl) await createBasicConnection(connect, commands, config);
  else await createNcConnection(connect, commands, config);
};

// Create a quick copy of file
const createFileFromLocal = (sftp, local, remote) => {
  return new Promise((resolve, reject) => {
    sftp.fastPut(local, remote, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  createConnection,
  createFileFromLocal
};
