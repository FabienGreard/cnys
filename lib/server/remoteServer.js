const client = require('../client'),
  fs = require('../fs');

const remoteServer = config => {
  this.url = config.url;
  this.remote = config.remote;
  this.ncUrl = config.ncUrl;
  this.username = config.username;
  this.privateKey = config.privateKey;
  this.verbose = config.verbose;
  this.debug = config.debug;
  this.retry = config.retry;
  return {
    connect: async () => {
      if (this.verbose) console.log('---- foldersync is listening ----');
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
      if (this.url) {
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

              //end the connection
              resolve(co.end());
            });
          },
          { verbose: this.verbose, debug: this.debug, retry: this.retry }
        );
        if (this.ncUrl) {
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

                //end the connection
                resolve(co.end());
              });
            },
            { verbose: this.verbose, debug: this.debug, retry: this.retry }
          );
        }
      } else {
        // read/write file from local
        if (stats.isFile()) {
          const data = await fs.readFile(`${path}/${name}`);
          try {
            await fs.writeFile(`${this.remote}/${name}`, data);
          } catch (e) {
            if (this.debug) console.log(e);
          }
        } else {
          try {
            await fs.writeDir(`${this.remote}/${name}`);
          } catch (e) {
            if (this.debug) console.log(e);
          }
        }
      }
    },
    remove: async (name, path) => {
      if (this.url) {
        // delete file from remote
        if (this.ncUrl) {
          // start a netcat shh connection
        }
      } else {
        // delete file from local
        const stats = await fs.getStats(`${this.remote}/${name}`);
        if (stats.isFile()) {
          try {
            await fs.deleteFile(`${this.remote}/${name}`);
          } catch (e) {
            if (this.debug) console.log(e);
          }
        } else {
          try {
            await fs.deleteDir(`${this.remote}/${name}`);
          } catch (e) {
            if (this.debug) console.log(e);
          }
        }
      }
    }
  };
};

module.exports = createRemoteServer = (url, options = {}) =>
  remoteServer(url, options);
