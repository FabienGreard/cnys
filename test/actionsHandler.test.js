const handler = require('../lib/actionsHandler');

describe('actionsHandler', () => {
  const queue = {
    push: (...args) => {
      expect(args[2]).toBe(1);
      args[1]();
    }
  };

  const obj = { ready: (...args) => new Promise(resolve => resolve()) };

  test('Should create a handler', () => {
    expect(handler(queue, {})).toHaveProperty('set');
  });

  test('Should push a new task (ready event)', () => {
    const _handler = handler(queue, { concurrency: 1 });
    const value = { args: [], action: 'ready' };
    _handler.set(obj, {}, value);
  });

  test('Should push a new task (change event)', () => {
    const _handler = handler(queue, { concurrency: 1 });
    const value = { args: [], action: 'change' };
    _handler.set(obj, {}, value);
  });
});
