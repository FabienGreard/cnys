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
      const _loadingBar = loadingBar();
      _loadingBar.addTask('task');
    });

    test('Should end a task', () => {
      const _loadingBar = loadingBar();
      _loadingBar.taskDone();
    });

    test('Should display a loading bar', () => {
      const _loadingBar = loadingBar();
      _loadingBar.showBar();
    });
  });
});
