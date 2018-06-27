exports.command = 'watch [folder] [remote]';
exports.desc = 'Start watching';
exports.builder = yargs => {
  yargs
    .option('verbose', {
      alias: 'v'
    })
    .option('debug', {
      alias: 'd'
    })
    .option('remove', {
      alias: 'r',
      describe: 'Enable delete file from remote.',
      type: 'boolean'
    })
    .option('glob', {
      alias: 'g',
      describe: 'A single string glob pattern or an array of them.',
      type: 'array'
    })
    .option('ignored', {
      alias: 'i',
      describe: 'A glob, regex, function, or array of any combination.',
      type: 'array'
    });
};
exports.handler = function(argv) {
  if (!argv.folder && typeof argv.folder !== 'string') {
    throw new Error('folder argumment is missing or invalid');
  }
  if (!argv.remote && typeof argv.remote !== 'string') {
    throw new Error('remote argumment is missing or invalid');
  }

  if (argv.verbose)
    console.log(`Start watching ${argv.folder} at ${argv.remote}`);

  return argv;
};
