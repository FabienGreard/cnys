const fs = require('fs'),
  del = require('del'),
  t = require('tar'),
  { debug } = require('./display');

const readDir = (path, _debug) => {
  return new Promise(async resolve => {
    fs.readdir(path, (err, files) => {
      if (err) resolve(debug(_debug, `err - ${err}`));
      else resolve(files);
    });
  });
};

/* PUBLIC METHOD */

const tar = async (path, _debug) => {
  return new Promise(async resolve => {
    const paths = await readDir(path, _debug);
    try {
      resolve(
        await t.c(
          { gzip: true, cwd: path, file: `${path}/init.cnys.tar` },
          paths
        )
      );
    } catch (err) {
      resolve(debug(_debug, `err - ${err}`));
    }
  });
};

const untar = async (path, _debug) => {
  return new Promise(async resolve => {
    const paths = await readDir(path, _debug);
    try {
      resolve(await t.x({ cwd: path, file: `${path}/init.cnys.tar` }));
    } catch (err) {
      resolve(debug(_debug, `err - ${err}`));
    }
  });
};

const createReadStream = path => {
  return fs.createReadStream(path);
};

const writeFile = (path, data, _debug) => {
  return new Promise(resolve => {
    fs.writeFile(path, data, err => {
      if (err) resolve(debug(_debug, `err - ${err}`));
      else resolve(path);
    });
  });
};

const readFileSync = (path, _debug) => {
  return fs.readFileSync(path, (err, data) => {
    if (err) resolve(debug(_debug, `err - ${err}`));
    else return data;
  });
};

const readFile = (path, _debug) => {
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      if (err) resolve(debug(_debug, `err - ${err}`));
      else resolve(data);
    });
  });
};

const deleteFile = (path, _debug) => {
  return new Promise(resolve => {
    fs.unlink(path, err => {
      if (err) resolve(debug(_debug, `err - ${err}`));
      else resolve(path);
    });
  });
};

const writeDir = (path, _debug) => {
  return new Promise(resolve => {
    fs.mkdir(path, err => {
      if (err) resolve(debug(_debug, `err - ${err}`));
      else resolve(path);
    });
  });
};

const deleteDir = (path, _debug) => {
  return new Promise(async resolve => {
    try {
      await del(path);
      resolve(path);
    } catch (err) {
      resolve(debug(_debug, `err - ${err}`));
    }
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
