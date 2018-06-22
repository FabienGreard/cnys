const fs = require('../fs');

const localServer = config => {
  this.remote = config.remote;
  this.folder = config.folder;
  this.remove = config.remove;
  this.verbose = config.verbose;
  this.debug = config.debug;
  return {
    connect: () => {
      if (this.verbose)
        console.log(`---- foldersync is listening on ${this.folder} ----`);
    },
    upload: async (name, path, stats) => {
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
    },
    remove: async (name, path) => {
      // delete file from local if remove is allowed
      if (this.remove) {
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

module.exports = createLocalServer = (url, options = {}) =>
  localServer(url, options);
