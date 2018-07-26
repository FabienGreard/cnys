const fs = require('fs'),
  del = require('del'),
  t = require('tar'),
  { debug } = require('./display');

const readDir = (path, _debug) => {
  return new Promise(async resolve => {
    fs.readdir(path, (err, files) => {
      if (err) resolve(debug(_debug, err));
      else resolve(files);
    });
  });
};

/* PUBLIC METHOD */

const tar = async (path, _debug = false) => {
  return new Promise(async resolve => {
    const paths = await readDir(path, _debug);
    try {
      await t.c(
        { gzip: true, cwd: path, file: `${path}/init.cnys.tar` },
        paths
      );
      resolve(paths);
    } catch (err) {
      resolve(debug(_debug, err));
    }
  });
};

const untar = async (path, _debug = false) => {
  return new Promise(async resolve => {
    const paths = await readDir(path, _debug);
    try {
      await t.x({ cwd: path, file: `${path}/init.cnys.tar` });
      resolve(paths);
    } catch (err) {
      resolve(debug(_debug, err));
    }
  });
};

const createReadStream = path => {
  return fs.createReadStream(path);
};

const writeFile = (path, data, _debug = false) => {
  return new Promise(resolve => {
    fs.writeFile(path, data, err => {
      if (err) resolve(debug(_debug, err));
      else resolve(path);
    });
  });
};

const readFileSync = (path, _debug = false) => {
  try {
    return fs.readFileSync(path);
  } catch (err) {
    return debug(_debug, err);
  }
};

const readFile = (path, _debug = false) => {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      if (err) resolve(debug(_debug, err));
      else resolve(data);
    });
  });
};

const deleteFile = (path, _debug = false) => {
  return new Promise(resolve => {
    fs.unlink(path, err => {
      if (err) resolve(debug(_debug, err));
      else resolve(path);
    });
  });
};

const writeDir = (path, _debug = false) => {
  return new Promise(resolve => {
    fs.mkdir(path, err => {
      if (err) resolve(debug(_debug, err));
      else resolve(path);
    });
  });
};

const deleteDir = path => {
  return new Promise(async resolve => {
    await del(path);
    resolve(path);
  });
};

module.exports = {
  tar,
  untar,
  createReadStream,
  writeFile,
  readFile,
  readFileSync,
  deleteFile,
  writeDir,
  deleteDir
};
