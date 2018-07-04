const fs = require('fs'),
  del = require('del');

const writeFile = (path, data, debug) => {
  return new Promise(resolve => {
    fs.writeFile(path, data, err => {
      if (err) {
        debug && console.log(err);
      } else {
        debug &&
          console.log(
            '---- writeFile ----\n',
            `${path} has been saved`,
            '\n--------------------'
          );
        resolve(path);
      }
    });
  });
};

const readFile = (path, debug) => {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      if (err) {
        debug && console.log(err);
      } else {
        debug &&
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
};

const deleteFile = (path, debug) => {
  return new Promise(resolve => {
    fs.unlink(path, err => {
      if (err) {
        debug && console.log(err);
      } else {
        debug &&
          console.log(
            '---- deleteFile ----\n',
            `${path} has been deleted`,
            '\n--------------------'
          );
        resolve(path);
      }
    });
  });
};

const writeDir = (path, debug) => {
  return new Promise(resolve => {
    fs.mkdir(path, err => {
      if (err) {
        debug && console.log(err);
      } else {
        debug &&
          console.log(
            '---- writeDir ----\n',
            `${path} has been saved`,
            '\n------------------'
          );
        resolve(path);
      }
    });
  });
};

const deleteDir = (path, debug) => {
  return new Promise(async resolve => {
    try {
      await del(path);
      debug &&
        console.log(
          '---- deleteDir ----\n',
          `${path} has been deleted`,
          '\n-------------------'
        );
      resolve(path);
    } catch (e) {
      debug && console.log(err);
    }
  });
};

module.exports = {
  writeFile,
  readFile,
  deleteFile,
  writeDir,
  deleteDir
};
