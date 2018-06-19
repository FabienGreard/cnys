const ssh2 = require('ssh2');

// Create a basic connection
const createBasicConnection = (connect, commands, config) => {
  const conn1 = new ssh2.Client();

  conn1
    .on('ready', async () => {
      if (config.verbose) console.log('---- connection start ----');
      await commands(conn2, config);
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
      await commands(conn2, config);
    })
    .on('close', () => conn1.end());
};

// Create a directory
const mkdir = (co, dir, config) => {
  return new Promise((resolve, reject) => {
    co.sftp((err, sftp) => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      }
      sftp.mkdir(dir, err => {
        if (err) {
          config.debug && console.log(err);
          reject(err);
        }
        if (config.verbose) console.log('---- sftp mkdir ----');
        resolve();
      });
    });
  });
};

// Create a quick copy of file
const createFileFromLocal = (co, local, remote, config) => {
  return new Promise((resolve, reject) => {
    co.sftp((err, sftp) => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      }
      sftp.fastPut(local, remote, err => {
        if (err) {
          config.debug && console.log(err);
          reject(err);
        }
        if (config.verbose) console.log('---- sftp fastPut ----');
        resolve();
      });
    });
  });
};

// Read files from dir
const readdir = (co, path, config) => {
  return new Promise((resolve, reject) => {
    co.sftp((err, sftp) => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      }
      sftp.readdir(path, (err, list) => {
        if (err) {
          config.debug && console.log(err);
          reject(err);
        }
        if (config.verbose) console.log('---- sftp readdir ----');
        resolve(list);
      });
    });
  });
};

//retry method
const retry = (co, config, command) => {
  let retry = config.retry;
  return new Promise(async resolve => {
    while (retry > 0) {
      if (config.debug) console.log(`---- retry ${retry} ----`);
      try {
        await command(co);
        break;
      } catch (e) {
        retry--;
      }
    }
    resolve();
  });
};

module.exports = {
  createBasicConnection,
  createNcConnection,
  mkdir,
  readdir,
  createFileFromLocal,
  retry
};
