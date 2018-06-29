const fs = require('../fs');

const localServer = config => {
  this.copy = config.copy;
  this.remove = config.remove;
  this.verbose = config.verbose;
  this.debug = config.debug;
  return {
    connect: async () => {
      if (this.verbose) console.log(`---- cnys connect ----`);

      this.source = `${process.cwd()}/${config.source}`;
      this.destination = `${process.cwd()}/${config.destination}`;

      // initalize the destination if copyOnInit is allowed
      if (this.copy) {
        await fs.copyDir(this.source, this.destination, this.debug);
      }
    },
    upload: async (name, path, stats) => {
      if (this.verbose) console.log(`---- cnys upload  ----`);

      const destination = `${this.destination}/${name}`,
        source = `${path}/${name}`;

      // read/write file from local
      if (stats.isFile()) {
        const data = await fs.readFile(source, this.debug);
        await fs.writeFile(destination, data, this.debug);
      } else {
        await fs.writeDir(destination, this.debug);
      }
    },
    remove: async (name, path) => {
      if (this.verbose) console.log(`---- cnys remove ----`);

      const destination = `${this.destination}/${name}`;

      // delete file from local if remove is allowed
      if (this.remove) {
        const stats = await fs.getStats(destination, this.debug);
        if (stats.isFile()) {
          await fs.deleteFile(destination, this.debug);
        } else {
          await fs.deleteDir(destination, this.debug);
        }
      }
    }
  };
};

module.exports = createLocalServer = config => localServer(config);
