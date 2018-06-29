const client = require('../client'),
  fs = require('../fs');

const remoteServer = config => {
  this.destination = config.destination;
  this.source = config.source;
  this.privateKey = config.privateKey;
  this.verbose = config.verbose;
  this.copy = config.copy;
  this.remove = config.remove;
  this.debug = config.debug;
  this.retry = config.retry;
  this.connect = {
    host: config.url,
    username: config.username,
    ncUrl: config.ncUrl,
    password: config.password
  };
  return {
    connect: async () => {
      if (this.verbose) console.log(`---- cnys is listening ----`);

      this.source = `${process.cwd()}/${config.source}`;

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

      // initalize the destination if copyOnInit is allowed
      if (this.copy) {
        await client.createConnection(
          this.connect,
          (co, config) => {
            return new Promise((resolve, reject) => {
              co.sftp(async (err, sftp) => {
                if (err) {
                  this.debug && console.log(err);
                  reject(err);
                } else {
                  const sources = await fs.readRecurse(this.source, this.debug);

                  for (let source of sources.reverse()) {
                    source = source.split(this.source).join(''); // get the file path without source path
                    await client.transferFromLocal(
                      sftp,
                      await fs.getStats(`${this.source}/${source}`, this.debug),
                      `${this.source}/${source}`,
                      `${this.destination}/${source}`,
                      config
                    );
                  }

                  resolve(co.end());
                }
              });
            });
          },
          { verbose: this.verbose, debug: this.debug, retry: this.retry }
        );
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
                this.debug && console.log(err);
                reject(err);
              } else {
                await client.transferFromLocal(
                  sftp,
                  stats,
                  source,
                  destination,
                  config
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
              co.exec(`rm -rf /${destination}`, err => {
                if (err) {
                  this.debug && console.log(err);
                  reject(err);
                } else {
                  resolve(co.end());
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

module.exports = createRemoteServer = config => remoteServer(config);
