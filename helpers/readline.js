const readline = require('readline');

module.exports = () => {
  this.rl =
    process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'startup'
      ? ''
      : readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
  this.firstScreen = 5;
  return {
    write: (message, pos) => {
      if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'startup')
        return;
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
