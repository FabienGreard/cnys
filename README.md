# cnys [![Build Status](https://travis-ci.org/FabienGreard/cnys.svg?branch=master)](https://travis-ci.org/FabienGreard/cnys)[![dependencies Status](https://david-dm.org/FabienGreard/cnys/status.svg)](https://david-dm.org/FabienGreard/cnys)[![devDependencies Status](https://david-dm.org/FabienGreard/cnys/dev-status.svg)](https://david-dm.org/FabienGreard/cnys?type=dev)

cnys main feature allow developers to synchronize files between remote server on change !, **what it does**:

- ssh/sftp ! :globe_with_meridians:
- Server hoping (netcat) :lock:
- Copy/delete file/folder ! :eyeglasses:
- Queue / concurrency :train:
- Ready to use :fire:

If something doesn’t work, please [file an issue](https://github.com/FabienGreard/cnys/issues/new) :bug:.

## Quick Start

### Install

```sh
$ npm install or yarn install
```

### Commands

Start cnys on a local folder to a local destination :

```sh
$ cyns local [source=<sourcePath>] [destination=<destinationpath>]
```

| Options | Description                                           | aliases | type                                                  | default           |
| ------- | ----------------------------------------------------- | ------- | ----------------------------------------------------- | ----------------- |
| verbose | Output action logs.                                   | --v     | boolean                                               | false             |
| debug   | Output debug logs.                                    | --d     | boolean                                               | false             |
| remove  | Enable delete file from destination.                  | --rm    | boolean                                               | true              |
| ignored | A glob, regex, function, or array of any combination. | --i     | [filePattern](https://github.com/micromatch/anymatch) | null              |
| events  | An array of event used as liteners.                   | --e     | array                                                 | [Events](#events) |

```sh
$ cyns remote [source=<sourcePath>] [url=<urlString>] [destination=<destinationpath>]
```

| Options     | Description                                            | aliases | type                                                  | default           |
| ----------- | ------------------------------------------------------ | ------- | ----------------------------------------------------- | ----------------- |
| verbose     | Output action logs. (will desactivate the loading bar) | --v     | boolean                                               | false             |
| debug       | Output debug logs.                                     | --d     | boolean                                               | false             |
| concurrency | Number of task that can be done in parallel.           | --c     | number                                                | 5                 |
| remove      | Enable delete file from destination.                   | --rm    | boolean                                               | true              |
| ignored     | A glob, regex, function, or array of any combination.  | --i     | [filePattern](https://github.com/micromatch/anymatch) | null              |
| ncUrl       | A netcat url for ssh. (this is your destination).      | --nc    | string                                                | null              |
| username    | A username to connect for ssh.                         | --u     | string                                                | null              |
| password    | A password to connect for ssh.                         | --pwd   | string                                                | null              |
| privateKey  | Will look for your pka file under ~/.ssh.              | --ppk   | boolean                                               | false             |
| events      | An array of event used as liteners.                    | --e     | array                                                 | [Events](#events) |

### Events

You may want to look at [chokidar](https://github.com/paulmillr/chokidar), to see what kind of events you could start watching, by default cnys use all events.

## Example of use :

```sh
$ cnys local 'sync' 'sync2' --v true --ignored '.git*' '*.yml'
```

The example above will start watching file on a folder name sync and copying file into folder sync2

```sh
$ cnys remote 'sync' '192.168.30.2' '/home/user/sync'  --ncUrl '192.168.30.3' --username 'fgreard' --privateKey true
```

The example above will start watching file on a folder name sync and copying file to '192.168.30.3' at '/home/user/test'

## Test

Use `npm test` to start testing your file. By default it read test file named `*.test.js` under `/test`.

You can easily add your own config by editing `package.json`

It also has a built-in coverage with `npm run coverage`

## Credits

[chokidar](https://github.com/paulmillr/chokidar), a powerfull watcher
[Jest](https://facebook.github.io/jest/), a testing framework

Thanks to Alexandre for the idea.
