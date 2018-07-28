const { debug, loadingBar } = require('./display');

// fifo model queue
module.exports = config => {
  this.tasks = [];
  this.running = 0;
  this.concurrency = config.concurrency;
  this.loadingBar = loadingBar();

  this.runTask = async (task, running = 1) => {
    this.running += running;
    this.loadingBar.showBar();
    debug(config.debug, 'task start');
    //run task callback
    await task((running = 1) => {
      this.loadingBar.taskDone();
      this.loadingBar.showBar();
      debug(config.debug, 'task end');
      //check if there is another task to the queue
      this.running -= running;
      if (this.tasks.length > 0) {
        const { _task, _running } = this.tasks.pop();
        this.runTask(_task, _running);
      }
    });
  };

  this.enqueueTask = task => this.tasks.unshift(task);

  return {
    push: (name, task, running) => {
      this.running < this.concurrency
        ? this.loadingBar.addTask(name) && this.runTask(task, running)
        : this.loadingBar.addTask(name) &&
          this.enqueueTask({ _task: task, _running: running });
    },
    getTasks: () => this.tasks
  };
};
