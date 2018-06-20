const createProxy = require('../lib/proxy');

describe('proxy', () => {
  test('Should createProxy', () => {
    const proxy = createProxy({});
    expect(proxy).toHaveProperty('notify');
  });
});
