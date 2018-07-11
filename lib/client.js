const ssh2 = require('ssh2');

// Create a basic connection
const createBasicConnection = (connect, commands, config) => {
  const conn1 = new ssh2.Client();

  conn1
    .on('ready', async () => {
      if (config.verbose) console.log('---- connection start ----');
      try {
        await commands(conn2, config);
      } catch (e) {
        config.debug && console.log(e);
      }
    })
    .on('close', () => {
      if (config.verbose) console.log('---- connection end ----');
    })
    .connect(connect);
};

// Create a netcat connection
const createNcConnection = (connect, commands, config) => {
  const conn1 = new ssh2.Client();
  const conn2 = new ssh2.Client();

  conn1
    .on('ready', () => {
      if (config.verbose) console.log('---- connection start ----');
      conn1.exec(`nc ${connect.ncUrl} 22`, (err, stream) => {
        if (err) conn1.end();
        conn2.connect({ sock: stream, ...connect });
      });
    })
    .on('close', () => {
      if (config.verbose) console.log('---- connection end ----');
    })
    .connect(connect);

  conn2
    .on('ready', async () => {
      try {
        await commands(conn2, config);
      } catch (e) {
        config.debug && console.log(e);
      }
    })
    .on('close', () => conn1.end());
};

// Switch beween netcat or basic connection
const createConnection = (connect, commands, config) => {
  if (!connect.ncUrl) createBasicConnection(connect, commands, config);
  else createNcConnection(connect, commands, config);
};

// Create a quick copy of file
const createFileFromLocal = (sftp, local, remote, config) => {
  return new Promise((resolve, reject) => {
    sftp.fastPut(local, remote, err => {
      if (config.verbose) console.log('---- sftp fastPut ----');
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  createConnection,
  createFileFromLocal
};
