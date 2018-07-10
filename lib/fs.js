const fs = require('fs'),
  del = require('del'),
  t = require('tar');

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

/* PUBLIC METHOD */

const tar = async (path, debug) => {
  return new Promise(async resolve => {
    const paths = await readDir(path, debug);
    try {
      await t.c({ cwd: path, file: `${path}/init.cnys.tar` }, paths);
      resolve();
    } catch (e) {
      debug && console.log(e);
    }
  });
};

const createReadStream = path => {
  return fs.createReadStream(path);
};

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

const readFileSync = (path, debug) => {
  return fs.readFileSync(path, (err, data) => {
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
      return data;
    }
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
  tar,
  createReadStream,
  writeFile,
  readFile,
  readFileSync,
  deleteFile,
  writeDir,
  deleteDir
};
