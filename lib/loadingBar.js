const readline = require('readline');

module.exports = loadingBar => {
  this.totalTask = 0;
  this.taskDone = 0;
  this.tasks = [];
  this.lastTaskName = '';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  this.format = (string, number) => {
    const _number = number - string.length;
    let _string = string;

    if (_number >= 0) {
      _string = _string.split('');
      _string.splice(string.length, 0, ' '.repeat(_number));
      _string = _string.join('');
    } else {
      _string = _string.split('/');

      for (let i = 3, length = 0; i < _string.length; i++) {
        length += _string[i].length;
        if (length + _number >= 0) {
          _string.splice(3, i, '...');
          _string = _string.join('/');
          break;
        }
      }
    }

    return _string;
  };
  return {
    addTask: name => {
      this.tasks.push(name);
      return ++this.totalTask;
    },
    taskDone: () => ++this.taskDone,
    showBar: () => {
      const done = (this.taskDone * 65) / this.totalTask;
      const total = 65 - done;
      const taskName =
        this.tasks[this.taskDone] !== undefined
          ? this.tasks[this.taskDone]
          : 'Cnys is waiting for change...';
      const isDone = taskName === 'Cnys is waiting for change...';

      this.lastTaskName = !isDone
        ? this.tasks[this.taskDone]
        : this.lastTaskName;

      readline.cursorTo(rl, 0, 0);
      readline.clearScreenDown(rl);
      rl.write(
        `\n\x1b[0m${
          !isDone
            ? this.format(taskName, 90)
            : this.format(this.lastTaskName, 90)
        }` +
          `\n\x1b[32m[${'='.repeat(done)}${'-'.repeat(total)}] ` +
          `\x1b[0m| ${this.format(
            this.taskDone + '',
            this.totalTask.toString().length
          )} / ${this.totalTask} ` +
          `\x1b[0m| ${this.format(
            Math.round((this.taskDone / this.totalTask) * 100) + '',
            3
          )} % ` +
          `\x1b[0m| ${isDone ? 'done' : 'processing'}`
      );

      isDone && rl.write(`\n\n${isDone ? taskName : ''}`);

      //reset
      if (isDone) {
        this.totalTask = 0;
        this.taskDone = 0;
        this.tasks = [];
        this.lastTaskName = '';
      }
    }
  };
};
