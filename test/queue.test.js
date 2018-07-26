const queue = require('../lib/queue'),
  delay = require('../helpers/delay');

describe('queue', () => {
  let task = done =>
    new Promise(resolve => setTimeout(() => resolve(done(), 100)));

  test('Should create a queue', () => {
    const _queue = queue({ concurrency: 1 });
    expect(_queue).toHaveProperty('push');
  });

  test('Should enqueue tasks and run tasks', async () => {
    const _queue = queue({ concurrency: 1 });
    _queue.push('testTask', task, 1);
    task = done => new Promise(resolve => resolve(done()));
    _queue.push('testTask', task);
    expect(_queue.getTasks().length).toBe(1);
    await delay(0.1);
    expect(_queue.getTasks()).toEqual([]);
  });
});
