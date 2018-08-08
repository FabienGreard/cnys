const { format, readline } = require('../helpers'),
  rl = readline();

const verbose = (_verbose, display) => {
  _verbose &&
    rl.write(`\x1b[37mINFO> \x1b[33m${format(display, 20)}`, 'verbose');
  return display;
};

const debug = (_debug, display) => {
  _debug && rl.write(`\x1b[37mDEBUG> \x1b[31m${format(display, 50)}`, 'debug');
  return display;
};

const loadingBar = () => {
  this.totalTask = 0;
  this.taskDone = 0;
  this.tasks = [];
  this.lastTaskName = '';
  return {
    addTask: name => {
      this.tasks.unshift(name);
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

      const title = !isDone
        ? format(taskName, 90)
        : format(this.lastTaskName, 90);
      const bar = '='.repeat(done) + '-'.repeat(total);
      const info = format(
        this.taskDone.toString(),
        this.totalTask.toString().length
      );
      const percentage = format(
        Math.round((this.taskDone / this.totalTask) * 100).toString(),
        3
      );

      rl.write(
        `\x1b[0m${title}` +
          `\n\x1b[32m[${bar}] ` +
          `\x1b[0m| ${info} / ${this.totalTask} ` +
          `\x1b[0m| ${percentage} % ` +
          `\n\n${isDone ? taskName : ''}`,
        'loading'
      );

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

module.exports = {
  verbose,
  debug,
  loadingBar
};
