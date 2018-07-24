const client = require('../client'),
  fs = require('../fs'),
  pathModule = require('path');

const remoteServer = config => {
  this.destination = config.destination;
  this.source = pathModule.join(`${process.cwd()}/${config.source}`);
  this.verbose = config.verbose;
  this.debug = config.debug;
  this.retry = config.retry;
  this.connect = {
    host: config.url,
    username: config.username,
    ncUrl: config.ncUrl,
    password: config.password,
    privateKey:
      config.privateKey &&
      fs.readFileSync(`${process.env.HOME}/.ssh/id_rsa`, config.debug)
  };
  this._delete = async destination => {
    await client.createConnection(
      this.connect,
      co => {
        return new Promise((resolve, reject) => {
          co.exec(`rm -rf /${destination}`, err => {
            if (err) {
              reject(err);
            } else {
              resolve(co.end());
            }
          });
        });
      },
      { verbose: this.verbose, debug: this.debug }
    );
  };
  this._upload = async (stats, source, destination) => {
    await client.createConnection(
      this.connect,
      co => {
        return new Promise((resolve, reject) => {
          co.sftp(async (err, sftp) => {
            if (err) reject(err);
            else {
              try {
                await client.createFileFromLocal(sftp, source, destination);
              } catch (e) {
                reject(e);
              }
              resolve(co.end());
            }
          });
        });
      },
      { verbose: this.verbose, debug: this.debug }
    );
  };
  return {
    ready: () => {
      // this.verbose && console.log(`---- cnys ready ----`);
      //
      // const source = this.source,
      //   destination = this.destination;
      //
      // return new Promise(async resolve => {
      //   resolve(
      //     Promise.all([
      //       await fs.tar(source, this.debug),
      //       await client.createConnection(
      //         this.connect,
      //         co => {
      //           return new Promise((resolve, reject) => {
      //             co.sftp(async (err, sftp) => {
      //               if (err) reject(err);
      //               else {
      //                 let from = fs.createReadStream(`${source}/init.cnys.tar`);
      //                 let to = sftp.createWriteStream(
      //                   `${destination}/init.cnys.tar`
      //                 );
      //
      //                 from.pipe(to);
      //
      //                 to.on('close', () => {
      //                   co.exec(
      //                     `tar -xvf ${destination}/init.cnys.tar -C ${destination}`,
      //                     async (err, stream) => {
      //                       if (err) reject(err);
      //                       stream
      //                         .on('close', () => {
      //                           co.exec(
      //                             `rm -rf ${destination}/init.cnys.tar`,
      //                             async err => {
      //                               if (err) reject(err);
      //                               else {
      //                                 await fs.deleteFile(
      //                                   `${source}/init.cnys.tar`,
      //                                   this.debug
      //                                 );
      //                                 resolve(co.end());
      //                               }
      //                             }
      //                           );
      //                         })
      //                         .on('data', data => {
      //                           this.debug && console.log('STDOUT: ' + data);
      //                         })
      //                         .stderr.on('data', data => {
      //                           this.debug && console.log('STDERR: ' + data);
      //                         });
      //                     }
      //                   );
      //                 });
      //               }
      //             });
      //           });
      //         },
      //         { verbose: this.verbose, debug: this.debug }
      //       )
      //     ])
      //   );
      // });
    },
    change: (path, stats) => {
      this.verbose && console.log(`---- cnys change ---`);

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(await this._upload(stats, source, destination));
      });
    },
    add: (path, stats) => {
      this.verbose && console.log(`----- cnys add -----`);

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(await this._upload(stats, source, destination));
      });
    },
    addDir: (path, stats) => {
      this.verbose && console.log(`--- cnys addDir ----`);

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(
          await client.createConnection(
            this.connect,
            co => {
              return new Promise((resolve, reject) => {
                co.exec(`mkdir -p /${destination}`, err => {
                  if (err) reject(err);
                  else resolve(co.end());
                });
              });
            },
            { verbose: this.verbose, debug: this.debug }
          )
        );
      });
    },
    unlink: (path, stats) => {
      this.verbose && console.log(`--- cnys unlink ----`);

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(await this._delete(destination));
      });
    },
    unlinkDir: (path, stats) => {
      this.verbose && console.log(`-- cnys unlinkDir --`);

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(await this._delete(destination));
      });
    }
  };
};

module.exports = createRemoteServer = config => remoteServer(config);
