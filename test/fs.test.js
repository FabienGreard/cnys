const fs = require('../lib/fs');

describe('fs', () => {
  test('tar', done => {
    fs.untar('./helpers', false).then(done);
  });

  test('untar', done => {
    fs.untar('./helpers', false).then(async () => {
      await fs.deleteFile('./helpers/init.cnys.tar', false);
      done();
    });
  });

  test('createReadStream', () => {
    const stream = fs.createReadStream('./helpers/delay.js');
    expect(stream).toHaveProperty('_readableState');
  });

  test('Should write a file', async () => {
    const data = await fs.readFile(`${process.cwd()}/config.js`, false);
    const file = fs.writeFile(`${process.cwd()}/config0.js`, data, false);
    await expect(file).resolves.toEqual(`${process.cwd()}/config0.js`);
  });

  test('Should read a file', async () => {
    const data = fs.readFile(`${process.cwd()}/config.js`, false);
    await expect(data).resolves.toBeInstanceOf(Buffer);
  });

  test('Should read a file (sync)', () => {
    const data = fs.readFileSync(`${process.cwd()}/config.js`, false);
    expect(data).toBeInstanceOf(Buffer);
  });

  test('Should delete a file', async () => {
    const file = fs.deleteFile(`${process.cwd()}/config0.js`, false);
    await expect(file).resolves.toEqual(`${process.cwd()}/config0.js`);
  });

  test('Should write a dir', async () => {
    const dir = fs.writeDir(`${process.cwd()}/fs-test`, false);
    await expect(dir).resolves.toEqual(`${process.cwd()}/fs-test`);
  });

  test('Should delete a dir', async () => {
    const dir = fs.deleteDir(`${process.cwd()}/fs-test`, false);
    await expect(dir).resolves.toEqual(`${process.cwd()}/fs-test`);
  });
});
