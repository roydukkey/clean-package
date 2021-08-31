# Clean Package

This `clean-package` tool is used for removing development configuration from 'package.json' before publishing the package to NPM.

[![Release Version](https://img.shields.io/npm/v/clean-package.svg)](https://www.npmjs.com/package/clean-package)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


## Install

```bash
npm install clean-package --save-dev
```


## Integrated Usage

The `clean-package` tool works directly on the 'package.json' file, to avoid breaking the NPM lifecycle. This allows you to add a script to the 'package.json' to clean the file during packing.

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "scripts": {
    "prepack": "clean-package",
    "postpack": "clean-package restore"
  }
}
```

See [CLI Usage](#command-line-usage 'Command Line Usage') for independent usage instructions.

#### JSON Configuration Files

Options can be configured in `clean-package.config.json` at the root of your project (where the `package.json` is).

```json
{
  "indent": 2,
  "remove": [
    "eslintConfig",
    "jest"
  ]
}
```

Alternatively, you can choose to specify your configuration from within `package.json` using the `clean-package` key like so:

```js
{
  "name": "my-package",
  "version": "1.0.0",
  "clean-package": {
    "indent": 2,
    "remove": [
      "eslintConfig",
      "jest"
    ]
  },

  // Or, a file path to a configuration.
  "clean-package": "./build/clean-package.config.js"
}
```

#### JavaScript Configuration File

You can also create the configuration using JavaScript in the `clean-package.config.js` at the root of your project:

```js
module.exports = {
  indent: '\t',
  replace: {
    'config.port': '8080'
  }
};
```


### Options

##### backupPath

Default: `'./package.json.backup'`

A `String` specifying the location and filename to which the `package.json` will be backed up.

##### indent

Default: `2`

A `String` or `Number` defining the indentation that's used to format the cleaned `package.json`. See the `space` parameter of `JSON.stringify` for [more information](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters).

##### remove

Default: `['clean-package']`

A `String[]` specifying the keys to be removed from the cleaned `package.json`; otherwise, `null` when nothing is to be removed.

Deeper keys can be accessed using a dot (e.g., `'key.keyInsideKey'`). Likewise, arrays are accessible using brackets (e.g., `'key.arrKey[0]'`).

##### replace

An `Object` specifying the keys to be replaced in the cleaned `package.json`; otherwise, `null` when nothing is to be replaced.

Deeper keys and arrays are accessible in the same manner. Additionally, the replaced keys may receive any valid JSON value, including objects.

##### extends

A `String` or `String[]` specifying the name/s of a shareable configuration.

This packages [shares a configuration](https://github.com/roydukkey/clean-package/blob/master/common.js) with common options and can be used by extending `clean-package/common`.

## Command Line Usage

```
clean-package [[<source-path>] <backup-path>] [<option>...]

where <option> is one of:

  -c,  --config <path>                  Specify the path to a configuration file.

  -i,  --indent <value>                 Specify the indentation, overriding configuration from file.

  -rm, --remove <key>...                Specify the keys to remove, overriding configuration from file.

       --removeAdd <key>...             Same as --remove without overriding configuration from file.

  -r,  --replace <key>=<value>...       Specify the keys to replace, overriding configuration from file.

       --replaceAdd <key>=<value>...    Same as --replace without overriding configuration from file.

       --extends <name>...              Specify the name to a shareable configuration. (e.g. 'clean-package/common')

       --print-config                   Print the combined configuration without executing command.

  -v,  --version                        Output the version number
```

```
clean-package restore [[<source-path>] <backup-path>] [<option>...]

alias: r

where <option> is one of:

  -c,  --config <path>                  Specify the path to a configuration file.

       --extends <name>...              Specify the name to a shareable configuration. (e.g. 'clean-package/common')

       --print-config                   Print the combined configuration without executing command.
```

### How do I remove package scripts and use `clean-package restore`?

If you're integrating `clean-package` into the NPM lifecycle, removing all the `package.json` scripts with `clean-package` will also remove them from the current execution. This is just how NPM works.

For example, this configuration will remove the `postpack` script before it is ever requested by `npm pack` or `npm publish`, thereby effectively removing the event from the executing lifecycle.

```json
{
  "scripts": {
    "prepack": "clean-package",
    "postpack": "clean-package restore"
  },
  "clean-package": {
    "remove": [
      "clean-package",
      "scripts"
    ]
  }
}
```

There are multiple ways to work around this (more than are offered here). One solution might be to manually run the command with `npx clean-package restore`. Another might be to define a custom script that would call `pack` and `clean-package` in sequence:

```json
{
  "scripts": {
    "prepack": "clean-package",
    "new:pack": "npm pack && clean-package restore",
    "new:publish": "npm publish && clean-package restore"
  }
}
```
