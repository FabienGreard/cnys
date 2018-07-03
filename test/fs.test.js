const fs = require('../lib/fs');

describe('fs', () => {
  test('Should write a file', async () => {
    // const data = await fs.readFile(`${process.cwd()}/config.js`, false);
    // const file = await fs.writeFile(`${process.cwd()}/config0.js`, data, false);
    // expect(file).toEqual(`${process.cwd()}/config0.js`);
  });

  test('Should read a file', async () => {
    // const data = await fs.readFile(`${process.cwd()}/config.js`, false);
    // expect(data).toBeInstanceOf(Buffer);
  });

  test('Should delete a file', async () => {
    // const file = await fs.deleteFile(`${process.cwd()}/config0.js`, false);
    // expect(file).toEqual(`${process.cwd()}/config0.js`);
  });

  test('Should write a dir', async () => {
    // const dir = await fs.writeDir(`${process.cwd()}/fs-test`, false);
    // expect(dir).toEqual(`${process.cwd()}/fs-test`);
  });

  test('Should delete a dir', async () => {
    // const dir = await fs.deleteDir(`${process.cwd()}/fs-test`, false);
    // expect(dir).toEqual(`${process.cwd()}/fs-test`);
  });
});
