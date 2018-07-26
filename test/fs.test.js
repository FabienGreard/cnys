const fs = require('../lib/fs');

describe('fs', () => {
  describe('tar', () => {
    test(`Should tar without error`, async () => {
      await expect(fs.tar('./commands')).resolves.toEqual(['cmds', 'index.js']);
    });

    test(`Should tar with error`, async () => {
      await expect(fs.tar('./not-match', true)).resolves.toThrow();
    });
  });

  describe('untar', () => {
    test('Should untar without error', async () => {
      await expect(fs.untar('./commands')).resolves.toEqual([
        'cmds',
        'index.js',
        'init.cnys.tar'
      ]);
      await fs.deleteFile('./commands/init.cnys.tar');
    });

    test(`Should untar with error`, async () => {
      await expect(fs.untar('./not-match', true)).resolves.toThrow();
    });
  });

  describe('createReadStream', () => {
    test('Should create a read stream', () => {
      const stream = fs.createReadStream(`./lib/index.js`);
      expect(stream).toHaveProperty('bytesRead');
    });
  });

  describe('writeFile', () => {
    test('Should write a file without error', async () => {
      const data = await fs.readFile('./config.js');
      const file = fs.writeFile('./config0.js', data);
      await expect(file).resolves.toEqual('./config0.js');
    });

    test('Should write a file with error', async () => {
      const data = await fs.readFile('./config.js');
      const file = fs.writeFile('./not-match/not-match.js', data, true);
      await expect(file).resolves.toThrow();
    });
  });

  describe('readFile', () => {
    test('Should read a file without error', async () => {
      const data = fs.readFile('./config.js');
      await expect(data).resolves.toBeInstanceOf(Buffer);
    });

    test('Should read a file with error', async () => {
      const data = fs.readFile('./not-match/not-match.js', true);
      await expect(data).resolves.toThrow();
    });
  });

  describe('readFileSync', () => {
    test('Should read a file (sync) without error', () => {
      const data = fs.readFileSync('./config.js');
      expect(data).toBeInstanceOf(Buffer);
    });

    test('Should read a file (sync) with error', () => {
      const data = fs.readFileSync('./not-match/not-match.js', true);
      expect(data.message).toBe(
        "ENOENT: no such file or directory, open './not-match/not-match.js'"
      );
    });
  });

  describe('deleteFile', () => {
    test('Should delete a file without error', async () => {
      const file = fs.deleteFile('./config0.js');
      await expect(file).resolves.toEqual('./config0.js');
    });

    test('Should delete a file with error', async () => {
      const file = fs.deleteFile('./not-match/not-match.js', true);
      await expect(file).resolves.toThrow();
    });
  });

  describe('writeDir', () => {
    test('Should delete a dir without error', async () => {
      const dir = fs.writeDir('./fs-test');
      await expect(dir).resolves.toEqual('./fs-test');
    });

    test('Should delete a dir with error', async () => {
      const dir = fs.writeDir('./not-match/not-match', true);
      await expect(dir).resolves.toThrow();
    });
  });

  describe('deleteDir', () => {
    test('Should delete a dir without error', async () => {
      const dir = fs.deleteDir('./fs-test');
      await expect(dir).resolves.toEqual('./fs-test');
    });
  });
});
