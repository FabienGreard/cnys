const fs = require('fs'),
  del = require('del');

/* FILE */

const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) reject(err);
      else resolve(`${path} has been saved`);
    });
  });
};

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const deleteFile = path => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) reject(err);
      else resolve(`${path} has been deleted`);
    });
  });
};

/* FOLDER */

const writeDir = path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) reject(err);
      else resolve(`${path} has been saved`);
    });
  });
};

const deleteDir = path => {
  return del(path);
};

/* STATS */

const getStats = path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) reject(err);
      else resolve(stats);
    });
  });
};
module.exports = {
  readFile,
  writeFile,
  deleteFile,
  writeDir,
  deleteDir,
  getStats
};
