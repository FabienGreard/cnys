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

// Switch beween netcat or basic connection
const createConnection = (connect, commands, config) => {
  if (!connect.ncUrl) createBasicConnection(connect, commands, config);
  else createNcConnection(connect, commands, config);
};

// Create a directory
const mkdir = (sftp, dir, config) => {
  return new Promise((resolve, reject) => {
    sftp.mkdir(dir, err => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      } else {
        if (config.verbose) console.log('---- sftp mkdir ----');
        resolve();
      }
    });
  });
};

// Delete a directory
const rmdir = (sftp, dir, config) => {
  return new Promise((resolve, reject) => {
    sftp.rmdir(dir, err => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      } else {
        if (config.verbose) console.log('---- sftp rmdir ----');
        resolve();
      }
    });
  });
};

// Create a quick copy of file
const createFileFromLocal = (sftp, local, remote, config) => {
  return new Promise((resolve, reject) => {
    sftp.fastPut(local, remote, err => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      } else {
        if (config.verbose) console.log('---- sftp fastPut ----');
        resolve();
      }
    });
  });
};

// Delete a file
const unlink = (sftp, file, config) => {
  return new Promise((resolve, reject) => {
    sftp.unlink(file, err => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      } else {
        if (config.verbose) console.log('---- sftp unlink ----');
        resolve();
      }
    });
  });
};

// Read files from dir
const readdir = (sftp, path, config) => {
  return new Promise((resolve, reject) => {
    sftp.readdir(path, (err, list) => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      } else {
        if (config.verbose) console.log('---- sftp readdir ----');
        resolve(list);
      }
    });
  });
};

// Read stats from path
const stats = (sftp, path, config) => {
  return new Promise((resolve, reject) => {
    sftp.stat(path, (err, stats) => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      } else {
        if (config.verbose) console.log('---- sftp stats ----');
        resolve(stats);
      }
    });
  });
};

// chmod on a given path
const chmod = (sftp, path, mode, config) => {
  return new Promise((resolve, reject) => {
    sftp.chmod(path, mode, err => {
      if (err) {
        config.debug && console.log(err);
        reject(err);
      } else {
        if (config.verbose) console.log('---- sftp chmod ----');
        resolve();
      }
    });
  });
};

//retry method
const retry = (sftp, config, command) => {
  let retry = config.retry;
  return new Promise(async resolve => {
    while (retry > 0) {
      if (config.debug) console.log(`---- retry ${retry} ----`);
      try {
        await command(sftp);
        break;
      } catch (e) {
        retry--;
      }
    }
    resolve();
  });
};

// transfert a file from local to remote
const transferFromLocal = (sftp, stats, source, destination, config) => {
  return new Promise(async resolve => {
    if (stats.isDirectory()) {
      try {
        await mkdir(sftp, destination, config);
        resolve(
          this.debug &&
            console.log(await readdir(sftp, this.destination, config))
        );
      } catch (e) {
        await retry(sftp, config, async sftp => {
          await mkdir(sftp, destination, config);
        });
      }
    } else {
      try {
        await createFileFromLocal(sftp, source, destination, config);
        resolve(
          this.debug &&
            console.log(await readdir(sftp, this.destination, config))
        );
      } catch (e) {
        await retry(sftp, config, async sftp => {
          await createFileFromLocal(sftp, source, destination, config);
        });
      }
    }
  });
};

module.exports = {
  createConnection,
  transferFromLocal
};
