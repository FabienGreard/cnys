const fs = require('fs'),
  ncp = require('ncp'),
  del = require('del');

class PromiseFs {
  constructor(config) {
    this.verbose = config.verbose;
    this.debug = config.debug;
  }

  writeFile(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, err => {
        if (err) {
          this.debug && console.log(err);
          reject(err);
        } else {
          this.debug &&
            console.log(
              '---- writeFile ----\n',
              `${path} has been saved`,
              '\n--------------------'
            );
          resolve(path);
        }
      });
    });
  }

  readFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          this.debug && console.log(err);
          reject(err);
        } else {
          this.debug &&
            console.log(
              '---- readFile ----\n',
              `${path} has been read as `,
              data,
              '\n------------------'
            );
          resolve(data);
        }
      });
    });
  }

  deleteFile(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, err => {
        if (err) {
          this.debug && console.log(err);
          reject(err);
        } else {
          this.debug &&
            console.log(
              '---- deleteFile ----\n',
              `${path} has been deleted`,
              '\n--------------------'
            );
          resolve(path);
        }
      });
    });
  }

  writeDir(path) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, err => {
        if (err) {
          this.debug && console.log(err);
          reject(err);
        } else {
          this.debug &&
            console.log(
              '---- writeDir ----\n',
              `${path} has been saved`,
              '\n------------------'
            );
          resolve(path);
        }
      });
    });
  }

  deleteDir(path) {
    return new Promise((resolve, reject) => {
      try {
        del(path);
        this.debug &&
          console.log(
            '---- deleteDir ----\n',
            `${path} has been deleted`,
            '\n-------------------'
          );
        resolve(path);
      } catch (e) {
        this.debug && console.log(err);
        reject(e);
      }
    });
  }

  copyDir(source, destination) {
    return new Promise((resolve, reject) => {
      ncp(source, destination, err => {
        if (err) {
          this.debug && console.log(err);
          reject(err);
        } else {
          this.debug &&
            console.log(
              '---- copyDir ----\n',
              `${source} has been copied to ${destination}`,
              '\n-----------------'
            );
          resolve(source);
        }
      });
    });
  }

  getStats(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          this.debug && console.log(err);
          reject(err);
        } else {
          this.debug &&
            console.log('---- getStats ----\n', stats, '\n------------------');
          resolve(stats);
        }
      });
    });
  }
}

module.exports = config => {
  return new PromiseFs(config);
};
