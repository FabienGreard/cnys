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
  return {
    addTask: name => {
      this.tasks.push(name);
      return ++this.totalTask;
    },
    taskDone: () => ++this.taskDone,
    showBar: () => {
      const done = (this.taskDone * 70) / this.totalTask;
      const total = 70 - done;
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
        `${isDone ? '-'.repeat(85) : '-'.repeat(94)}` +
          `\n\x1b[0m${!isDone ? taskName : this.lastTaskName}` +
          `\n\x1b[32m${'|'.repeat(done)}${':'.repeat(total)} ` +
          `\x1b[0m| ${this.taskDone} / ${this.totalTask} ` +
          `\x1b[0m| ${isDone ? 'done' : 'processing'}` +
          `\n${isDone ? '-'.repeat(85) : '-'.repeat(94)}` +
          `\n${isDone ? taskName : ''}`
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
