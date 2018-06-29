const fs = require('fs'),
  ncp = require('ncp'),
  del = require('del');

const writeFile = (path, data, debug) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        debug && console.log(err);
        reject(err);
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
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        debug && console.log(err);
        reject(err);
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
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) {
        debug && console.log(err);
        reject(err);
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
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        debug && console.log(err);
        reject(err);
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

const readDir = (path, debug) => {
  return new Promise(async (resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        debug && console.log(err);
        reject(err);
      } else {
        debug &&
          console.log(
            '---- readDir ----\n',
            `${files} has been read`,
            '\n------------------'
          );
        resolve(files);
      }
    });
  });
};

const readRecurse = (path, debug, fileList = []) => {
  return new Promise(async (resolve, reject) => {
    const files = await readDir(path, debug);
    fileList.push(
      ...(await Promise.all(
        files.map(async file => {
          (await getStats(`${path}/${file}`, debug)).isDirectory() &&
            (await readRecurse(`${path}/${file}`, debug, fileList));

          return `${path}/${file}`;
        })
      ))
    );

    resolve(fileList);
  });
};

const deleteDir = (path, debug) => {
  return new Promise(async (resolve, reject) => {
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
      reject(e);
    }
  });
};

const copyDir = (source, destination, debug) => {
  return new Promise((resolve, reject) => {
    ncp(source, destination, err => {
      if (err) {
        debug && console.log(err);
        reject(err);
      } else {
        debug &&
          console.log(
            '---- copyDir ----\n',
            `${source} has been copied to ${destination}`,
            '\n-----------------'
          );
        resolve(source);
      }
    });
  });
};

const getStats = (path, debug) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        debug && console.log(err);
        reject(err);
      } else {
        debug &&
          console.log('---- getStats ----\n', stats, '\n------------------');
        resolve(stats);
      }
    });
  });
};

module.exports = {
  writeFile,
  readFile,
  deleteFile,
  writeDir,
  deleteDir,
  copyDir,
  readDir,
  readRecurse,
  getStats
};
