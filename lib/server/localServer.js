const fs = require('../fs'),
  pathModule = require('path');

const localServer = config => {
  this.verbose = config.verbose;
  this.debug = config.debug;
  this.destination = pathModule.join(`${process.cwd()}/${config.destination}`);
  this.source = pathModule.join(`${process.cwd()}/${config.source}`);
  return {
    ready: async () => {
      if (this.verbose) console.log(`---- cnys ready ----`);
    },
    change: async (path, stats) => {
      if (this.verbose) console.log(`---- cnys change ----`);

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      const data = await fs.readFile(source, this.debug);
      await fs.writeFile(destination, data, this.debug);
    },
    add: async (path, stats) => {
      if (this.verbose) console.log(`---- cnys add ----`);

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      const data = await fs.readFile(source, this.debug);
      await fs.writeFile(destination, data, this.debug);
    },
    addDir: async (path, stats) => {
      if (this.verbose) console.log(`---- cnys addDir ----`);

      const source = pathModule.join(path),
        name = source.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      await fs.writeDir(destination, this.debug);
    },
    unlink: async (path, stats) => {
      if (this.verbose) console.log(`---- cnys unlink ----`);

      const source = pathModule.join(path),
        name = source.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      await fs.deleteFile(destination, this.debug);
    },
    unlinkDir: async (path, stats) => {
      if (this.verbose) console.log(`---- cnys unlinkDir ----`);

      const source = pathModule.join(path),
        name = source.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      await fs.deleteDir(destination, this.debug);
    }
  };
};

module.exports = createLocalServer = config => localServer(config);
