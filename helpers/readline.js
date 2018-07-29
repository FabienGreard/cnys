const readline = require('readline');

module.exports = () => {
  if (process.env.NODE_ENV === 'test') return;
  this.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  this.firstScreen = 5;
  return {
    write: (message, pos) => {
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
    }
  };
};
