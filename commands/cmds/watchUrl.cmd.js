exports.command = 'watchurl [url] [folder] [remote]';
exports.desc = 'Start watching';
exports.builder = yargs => {
  yargs
    .option('verbose', {
      alias: 'v'
    })
    .option('debug', {
      alias: 'd'
    })
    .option('url', {
      describe: 'A url for ssh',
      type: 'string'
    })
    .option('username', {
      alias: 'u',
      describe: 'A username to connect for ssh',
      type: 'string'
    })
    .option('privateKey', {
      alias: 'pk',
      describe: 'A path to your privateKey for ssh',
      type: 'boolean'
    })
    .option('ncUrl', {
      alias: 'nc',
      describe: 'A netcat url for ssh',
      type: 'string'
    })
    .option('proxy', {
      alias: 'p',
      describe: 'Use a proxy setting',
      type: 'string'
    })
    .option('remove', {
      alias: 'r',
      describe: 'Enable delete file from remote server.',
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
    })
    .option('retry', {
      describe: 'Number of retry when an error occur durring copy',
      type: 'number'
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
    console.log(
      `Start watching ${argv.folder} on ${argv.url} at ${argv.remote}`
    );
  return argv;
};
