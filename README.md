# cnys [![Build Status](https://travis-ci.org/FabienGreard/cnys.svg?branch=master)](https://travis-ci.org/FabienGreard/cnys)[![dependencies Status](https://david-dm.org/FabienGreard/cnys/status.svg)](https://david-dm.org/FabienGreard/cnys)[![devDependencies Status](https://david-dm.org/FabienGreard/cnys/dev-status.svg)](https://david-dm.org/FabienGreard/cnys?type=dev)

cnys main feature allow developers to synchronize files between remote server on change !, **what it does**:

- ssh ! :globe_with_meridians:
- Server hoping (netcat) :lock:
- Copy/delete file/folder ! :eyeglasses:
- Ready to use :fire:

If something doesn’t work, please [file an issue](https://github.com/FabienGreard/cnys/issues/new) :bug:.

## Quick Start

### Install

```sh
npm install or yarn install
```

### Commands

Start cnys on a local folder to a local destination :

`./index localWatch [source=<sourcePath>] [destination=<destinationpath>]`

| Options   | Description                                           | aliases | type        |
| --------- | ----------------------------------------------------- | ------- | ----------- |
| --verbose | Output action logs                                    | --v     | boolean     |
| --debug   | Output debug logs                                     | --d     | boolean     |
| --copy    | Enable to copy source to destination at start         | --cp    | boolean     |
| --remove  | Enable delete file from destination                   | --rm    | boolean     |
| --glob    | A single string glob pattern or an array of them      | --g     | filePattern |
| --ignored | A glob, regex, function, or array of any combination. | --i     | filePattern |

`./index localWatch [source=<sourcePath>] [url=<urlString>] [destination=<destinationpath>]`

| Options      | Description                                           | aliases | type        |
| ------------ | ----------------------------------------------------- | ------- | ----------- |
| --verbose    | Output action logs                                    | --v     | boolean     |
| --debug      | Output debug logs                                     | --d     | boolean     |
| --copy       | Enable to copy source to destination at start         | --cp    | boolean     |
| --remove     | Enable delete file from destination                   | --rm    | boolean     |
| --glob       | A single string glob pattern or an array of them      | --g     | filePattern |
| --ignored    | A glob, regex, function, or array of any combination. | --i     | filePattern |
| --ncUrl      | A netcat url for ssh.                                 | --nc    | string      |
| --retry      | Number of retry when an error occur durring copy.     | --r     | number      |
| --username   | A username to connect for ssh.                        | --u     | string      |
| --password   | A password to connect for ssh.                        | --pwd   | string      |
| --privateKey | Will look for your pka file under ~/.ssh.             | --ppk   | boolean     |

## Test

cnys use [Jest](https://facebook.github.io/jest/) as a testing framework

Use `npm test` to start testing your file. By default it read test file named `*.test.js` under `/test`.

You can easily add your own config by editing `package.json`

It also has a built-in coverage with `npm run coverage`

## Next Steps

Replace sane with chokidar
Use of fs-extra instead of ncp/del
