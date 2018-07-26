const handler = require('../lib/actionsHandler');

describe('actionsHandler', () => {
  const queue = {
    push: (...args) => {}
  };

  test('Should create a handler', () => {
    expect(handler(queue, {})).toHaveProperty('set');
  });
});
