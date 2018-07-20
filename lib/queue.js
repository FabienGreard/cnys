// fifo model queue
module.exports = queue = config => {
  this.tasks = [];
  this.running = 0;
  this.concurrency = config.concurrency;

  this.runTask = async (task, running = 1) => {
    if (config.verbose) console.log('---- task start ----');
    this.running += running;
    //run task callback
    await task(running => {
      if (config.verbose) console.log('----- task end -----');
      this.running -= running;
      if (this.tasks.length > 0) {
        const { _task, _running } = this.tasks.pop();
        this.runTask(_task, _running);
      }
    });
  };

  this.enqueueTask = task => this.tasks.unshift(task);

  return {
    push: (task, running) => {
      this.running < this.concurrency
        ? this.runTask(task, running)
        : this.enqueueTask({ _task: task, _running: running });
    }
  };
};
