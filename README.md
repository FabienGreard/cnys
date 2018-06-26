# FolderSync [![Build Status](https://travis-ci.org/FabienGreard/foldersync.svg?branch=master)](https://travis-ci.org/FabienGreard/foldersync)[![dependencies Status](https://david-dm.org/FabienGreard/foldersync/status.svg)](https://david-dm.org/FabienGreard/foldersync)[![devDependencies Status](https://david-dm.org/FabienGreard/foldersync/dev-status.svg)](https://david-dm.org/FabienGreard/foldersync?type=dev)

foldersync main feature allow developers to synchronize files between remote server on change !, **what it does**:

- ssh ! :globe_with_meridians:
- Server hoping (netcat) :lock:
- Copy/delete file/folder ! :eyeglasses:
- Ready to use :fire:

If something doesn’t work, please [file an issue](https://github.com/FabienGreard/foldersync/issues/new) :bug:.

## Quick Start

### Install

```sh
npm install or yarn install
```

### Commands

Start folderSync on a local folder to a local destination :

`./index localWatch [source=<sourcePath>][destination=<destinationpath=>]`

| Options   | Description                                           | aliases | type        |
| --------- | ----------------------------------------------------- | ------- | ----------- |
| --verbose | Output action logs                                    | --v     | boolean     |
| --debug   | Output debug logs                                     | --d     | boolean     |
| --copy    | Enable to copy source to destination at start         | --c     | boolean     |
| --remove  | Enable delete file from destination                   | --r     | boolean     |
| --glob    | A single string glob pattern or an array of them      | --g     | filePattern |
| --ignored | A glob, regex, function, or array of any combination. | --i     | filePattern |

## Test

foldersync use [Jest](https://facebook.github.io/jest/) as a testing framework

Use `npm test` to start testing your file. By default it read test file named `*.test.js` under `/test`.

You can easily add your own config by editing `package.json`

It also has a built-in coverage with `npm run coverage`
