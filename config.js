module.exports = {
  source: null,
  url: null,
  ncUrl: null,
  username: null,
  password: null,
  privateKey: false,
  destination: null,
  remove: true,
  concurrency: 5,
  events: ['ready', 'change', 'add', 'addDir', 'unlink', 'unlinkDir'],
  ignored: null,
  verbose: false,
  debug: false
};
