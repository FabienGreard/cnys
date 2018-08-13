exports.command = 'init';
exports.desc = 'Step by step helper';
exports.handler = function(argv) {
  argv.stepByStep = true;
  return argv;
};
