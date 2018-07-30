const { loadingBar, verbose, debug } = require('../lib/display');

describe('display', () => {
  describe('debug', () => {
    test('Should display a debug', () => {
      expect(debug(true, 'debug')).toBe('debug');
    });
  });

  describe('verbose', () => {
    test('Should display a verbose', () => {
      expect(verbose(true, 'verbose')).toBe('verbose');
    });
  });

  describe('loadingBar', () => {
    test('Should create a loadingBar', () => {
      const _loadingBar = loadingBar();
      expect(_loadingBar).toHaveProperty('addTask');
      expect(_loadingBar).toHaveProperty('taskDone');
      expect(_loadingBar).toHaveProperty('showBar');
    });

    test('Should add a task', () => {
      //not implemented
    });

    test('Should end a task', () => {
      //not implemented
    });

    test('Should display a loading bar', () => {
      //not implemented
    });
  });
});
