const fs = require('../fs'),
  pathModule = require('path'),
  { verbose, debug } = require('../display');

const localServer = config => {
  this.verbose = config.verbose;
  this.debug = config.debug;
  this.destination = pathModule.join(`${process.cwd()}/${config.destination}`);
  this.source = pathModule.join(`${process.cwd()}/${config.source}`);
  return {
    ready: () => {
      verbose(this.verbose, 'cnys ready');

      const source = this.source,
        name = 'init.cnys.tar',
        destination = this.destination;

      return new Promise(async resolve => {
        resolve(
          Promise.all([
            await fs.tar(source),
            await fs.writeFile(
              `${destination}/${name}`,
              await fs.readFile(`${source}/${name}`, this.debug),
              this.debug
            ),
            await fs.untar(destination),
            await fs.deleteFile(`${source}/${name}`, this.debug),
            await fs.deleteFile(`${destination}/${name}`, this.debug)
          ])
        );
      });
    },
    change: (path, stats) => {
      verbose(this.verbose, 'cnys change');

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(
          await fs.writeFile(
            destination,
            await fs.readFile(source, this.debug),
            this.debug
          )
        );
      });
    },
    add: (path, stats) => {
      verbose(this.verbose, 'cnys add');

      const source = pathModule.join(path),
        name = path.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(
          await fs.writeFile(
            destination,
            await fs.readFile(source, this.debug),
            this.debug
          )
        );
      });
    },
    addDir: (path, stats) => {
      verbose(this.verbose, 'cnys addDir');

      const source = pathModule.join(path),
        name = source.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(await fs.writeDir(destination, this.debug));
      });
    },
    unlink: (path, stats) => {
      verbose(this.verbose, 'cnys unlink');

      const source = pathModule.join(path),
        name = source.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(await fs.deleteFile(destination, this.debug));
      });
    },
    unlinkDir: (path, stats) => {
      verbose(this.verbose, 'cnys unlinkDir');

      const source = pathModule.join(path),
        name = source.split(this.source).join(''),
        destination = `${this.destination}${name}`;

      return new Promise(async resolve => {
        resolve(await fs.deleteDir(destination));
      });
    }
  };
};

module.exports = createLocalServer = config => localServer(config);
