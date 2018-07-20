module.exports = {
  source: null,
  url: null,
  ncUrl: null,
  username: null,
  password: null,
  privateKey: false,
  destination: null,
  remove: true,
  force: false,
  concurrency: 5,
  events: ['ready', 'change', 'add', 'addDir', 'unlink', 'unlinkDir'],
  ignored: null,
  verbose: true,
  debug: false
};
