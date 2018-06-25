const fs = require('../fs');

const localServer = config => {
  this.source = `${process.cwd()}/${config.source}`;
  this.destination = `${process.cwd()}/${config.destination}`;
  this.copy = config.copy;
  this.remove = config.remove;
  this.verbose = config.verbose;
  this.debug = config.debug;
  this.fs = fs(config);
  return {
    connect: async () => {
      if (this.verbose) console.log(`---- foldersync connect ----`);
      // initalize the destination if copyOnInit is allowed
      if (this.copy) {
        await this.fs.copyDir(this.source, this.destination);
      }
    },
    upload: async (name, path, stats) => {
      if (this.verbose) console.log(`---- foldersync upload  ----`);
      // read/write file from local
      if (stats.isFile()) {
        const data = await this.fs.readFile(`${path}/${name}`);
        await this.fs.writeFile(`${this.destination}/${name}`, data);
      } else {
        await this.fs.writeDir(`${this.destination}/${name}`);
      }
    },
    remove: async (name, path) => {
      if (this.verbose) console.log(`---- foldersync remove ----`);
      // delete file from local if remove is allowed
      if (this.remove) {
        const stats = await this.fs.getStats(`${this.destination}/${name}`);
        if (stats.isFile()) {
          await this.fs.deleteFile(`${this.destination}/${name}`);
        } else {
          await this.fs.deleteDir(`${this.destination}/${name}`);
        }
      }
    }
  };
};

module.exports = createLocalServer = (url, options = {}) =>
  localServer(url, options);
