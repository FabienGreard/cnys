const client = require('../client'),
  fs = require('../fs');

const destinationServer = config => {
  this.source = `${process.cwd()}/${config.source}`;
  this.url = config.url;
  this.destination = config.destination;
  this.source = config.source;
  this.ncUrl = config.ncUrl;
  this.username = config.username;
  this.privateKey = config.privateKey;
  this.verbose = config.verbose;
  this.copy = config.copy;
  this.remove = config.remove;
  this.debug = config.debug;
  this.retry = config.retry;
  return {
    connect: async () => {
      if (this.verbose) console.log(`---- foldersync is listening ----`);
      this.connect = {
        host: this.url,
        username: this.username,
        ncUrl: this.ncUrl,
        password: this.password
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
      const destination = `${this.destination}/${name}`,
        source = `${path}/${name}`;

      // read/write file from destination
      await client.createConnection(
        this.connect,
        (co, config) => {
          return new Promise((resolve, reject) => {
            co.sftp(async (err, sftp) => {
              if (err) {
                this.debug && console.log('SFTP', err);
                reject(err);
              } else {
                // list of commands :
                if (stats.isDirectory()) {
                  try {
                    await client.mkdir(sftp, destination, config);
                  } catch (e) {
                    await client.retry(sftp, config, async sftp => {
                      await client.mkdir(sftp, destination, config);
                    });
                  }
                } else {
                  try {
                    await client.createFileFromLocal(
                      sftp,
                      source,
                      destination,
                      config
                    );
                  } catch (e) {
                    await client.retry(sftp, config, async sftp => {
                      await client.createFileFromLocal(
                        sftp,
                        source,
                        destination,
                        config
                      );
                    });
                  }
                }

                if (this.debug)
                  console.log(
                    await client.readdir(sftp, this.destination, config)
                  );

                resolve(co.end());
              }
            });
          });
        },
        { verbose: this.verbose, debug: this.debug, retry: this.retry }
      );
    },
    remove: async (name, path) => {
      const destination = `${this.destination}/${name}`;
      // delete file from destination if remove is allowed
      if (this.remove) {
        await client.createConnection(
          this.connect,
          (co, config) => {
            return new Promise((resolve, reject) => {
              co.exec(`rm -rf /${destination}`, (err, stream) => {
                if (err) {
                  this.debug && console.log(err);
                  reject(err);
                } else {
                  stream.on('end', () => {
                    resolve(co.end());
                  });
                }
              });
            });
          },
          { verbose: this.verbose, debug: this.debug, retry: this.retry }
        );
      }
    }
  };
};

module.exports = createdestinationServer = (url, options = {}) =>
  destinationServer(url, options);
