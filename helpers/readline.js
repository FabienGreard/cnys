const readline = require('readline');

// const askUser = (display, condition) => {
//   return new Promise(async resolve => {
//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
//
//     rl.question(display, async answer => {
//       rl.close();
//       if (condition(answer)) resolve(await askUser(display, condition));
//       resolve(answer);
//     });
//   });
// };

// stepByStepCmd: config => {
//   return new Promise(async resolve => {
//     this.rl.close();
//     //remote or local ?
//     const isRemote =
//       (await askUser(
//         'Welcome to cnys guide step by step !\nFirst are you going to use cnys to push your file over a remote server ? (y/n)',
//         answer => {
//           const _answer = answer.toString();
//           return (
//             _answer.toLowerCase() !== 'y' && _answer.toLowerCase() !== 'n'
//           );
//         }
//       )) === 'y'
//         ? true
//         : false;
//
//     config.source =
//       (await askUser(
//         'Enter a folder url to start listening to ? (default ".")',
//         answer => {
//           const _answer = answer.toString();
//           return isNaN(_answer.toLowerCase());
//         }
//       )) || config.source;
//
//     config.destination = await askUser(
//       'Enter a folder url, to indicate where to copy the directory ?',
//       answer => {
//         const _answer = answer.toString();
//         return isNaN(_answer.toLowerCase());
//       }
//     );
//
//     if (isRemote) {
//       config.url = await askUser('Enter the server url', answer => answer);
//
//       config.ncUrl = await askUser(
//         'Enter the nc server ? (leave blank if none)',
//         answer => answer
//       );
//
//       config.privateKey =
//         (await askUser('Are you using a privateKey ? (y/n)', answer => {
//           const _answer = answer.toString();
//           return (
//             _answer.toLowerCase() !== 'y' && _answer.toLowerCase() !== 'n'
//           );
//         })) === 'y'
//           ? true
//           : false;
//
//       if (!config.privateKey) {
//         config.password = await askUser(
//           'Enter the server password',
//           answer => answer
//         );
//       }
//
//       resolve(config);
//     }
//   });
// }

module.exports = () => {
  this.rl =
    process.env.NODE_ENV === 'test'
      ? ''
      : readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
  this.firstScreen = 5;
  return {
    write: (message, pos) => {
      if (process.env.NODE_ENV === 'test') return;
      const _pos =
        pos === 'loading'
          ? { x: 0, y: 0 }
          : {
              x: 0,
              y:
                this.firstScreen <= 20
                  ? this.firstScreen++
                  : (this.firstScreen = 5)
            };

      readline.cursorTo(this.rl, _pos.x, _pos.y);
      this.rl.write(message);
      readline.moveCursor(this.rl, -999999, 1);
    }
  };
};
