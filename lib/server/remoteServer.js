const client = require('../client'),
  fs = require('../fs');

const remoteServer = config => {
  this.url = config.url;
  this.remote = config.remote;
  this.folder = config.folder;
  this.ncUrl = config.ncUrl;
  this.username = config.username;
  this.privateKey = config.privateKey;
  this.verbose = config.verbose;
  this.debug = config.debug;
  this.retry = config.retry;
  return {
    connect: async () => {
      if (this.verbose) console.log(`---- foldersync is listening ----`);
      this.connect = {
        host: this.url,
        username: this.username,
        ncUrl: this.ncUrl
      };

      // try to load privateKey
      if (this.privateKey) {
        try {
          this.connect.privateKey = await fs.readFile(
            `${process.env.HOME}/.ssh/id_rsa`
          );
        } catch (e) {
          if (this.debug) console.log(e);
        }
      }
    },
    upload: async (name, path, stats) => {
      if (!this.ncUrl) {
        // read/write file from remote
        await client.createBasicConnection(
          this.connect,
          (co, config) => {
            return new Promise(async (resolve, reject) => {
              // list of commands :
              if (stats.isDirectory()) {
                try {
                  await client.mkdir(co, `${this.remote}/${name}`, config);
                } catch (e) {
                  await client.retry(co, config, async co => {
                    await client.mkdir(co, `${this.remote}/${name}`, config);
                  });
                }
              } else {
                try {
                  await client.createFileFromLocal(
                    co,
                    `${path}/${name}`,
                    `${this.remote}/${name}`,
                    config
                  );
                } catch (e) {
                  await client.retry(co, config, async co => {
                    await client.createFileFromLocal(
                      co,
                      `${path}/${name}`,
                      `${this.remote}/${name}`,
                      config
                    );
                  });
                }
              }
              if (this.debug)
                console.log(await client.readdir(co, this.remote, config));
              resolve(co.end());
            });
          },
          { verbose: this.verbose, debug: this.debug, retry: this.retry }
        );
      } else {
        //start a netcat shh connection
        await client.createNcConnection(
          this.connect,
          (co, config) => {
            return new Promise(async (resolve, reject) => {
              // list of commands :
              if (stats.isDirectory()) {
                try {
                  await client.mkdir(co, `${this.remote}/${name}`, config);
                } catch (e) {
                  await client.retry(co, config, async co => {
                    await client.mkdir(co, `${this.remote}/${name}`, config);
                  });
                }
              } else {
                try {
                  await client.createFileFromLocal(
                    co,
                    `${path}/${name}`,
                    `${this.remote}/${name}`,
                    config
                  );
                } catch (e) {
                  await client.retry(co, config, async co => {
                    await client.createFileFromLocal(
                      co,
                      `${path}/${name}`,
                      `${this.remote}/${name}`,
                      config
                    );
                  });
                }
              }
              if (this.debug)
                console.log(await client.readdir(co, this.remote, config));
              resolve(co.end());
            });
          },
          { verbose: this.verbose, debug: this.debug, retry: this.retry }
        );
      }
    },
    remove: async (name, path) => {
      // delete file from remote if remove is allowed
      if (this.remove) {
        if (!this.ncUrl) {
          // delete file from remote without netcat
        } else {
          // delete file from remote with netcat
        }
      }
    }
  };
};

module.exports = createRemoteServer = (url, options = {}) =>
  remoteServer(url, options);
