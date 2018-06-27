const fs = require('../fs');

const localServer = config => {
  this.source = `${process.cwd()}/${config.source}`;
  this.destination = `${process.cwd()}/${config.destination}`;
  this.copy = config.copy;
  this.remove = config.remove;
  this.verbose = config.verbose;
  this.debug = config.debug;
  return {
    connect: async () => {
      const source = this.source,
        destination = this.destination,
        debug = this.debug;

      if (this.verbose) console.log(`---- foldersync connect ----`);
      // initalize the destination if copyOnInit is allowed
      if (this.copy) {
        await fs.copyDir(source, destination, debug);
      }
    },
    upload: async (name, path, stats) => {
      const destination = this.destination,
        debug = this.debug;

      if (this.verbose) console.log(`---- foldersync upload  ----`);
      // read/write file from local
      if (stats.isFile()) {
        const data = await fs.readFile(`${path}/${name}`, debug);
        await fs.writeFile(`${destination}/${name}`, data, debug);
      } else {
        await fs.writeDir(`${destination}/${name}`, debug);
      }
    },
    remove: async (name, path) => {
      const destination = this.destination,
        debug = this.debug;

      if (this.verbose) console.log(`---- foldersync remove ----`);
      // delete file from local if remove is allowed
      if (this.remove) {
        const stats = await fs.getStats(`${destination}/${name}`, debug);
        if (stats.isFile()) {
          await fs.deleteFile(`${destination}/${name}`, debug);
        } else {
          await fs.deleteDir(`${destination}/${name}`, debug);
        }
      }
    }
  };
};

module.exports = createLocalServer = (url, options = {}) =>
  localServer(url, options);
