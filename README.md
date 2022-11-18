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

When the "prepack" script executes, a backup of the original `package.json` will be created. Ensure this file doesn't make it into your release package.

One way to accomplish this is to add the following to your `.npmignore` file:

```ignore
*.backup
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

You can also create the configuration using JavaScript in the `clean-package.config.?(c|m)js` at the root of your project:

```js
module.exports = {
  indent: '\t',
  replace: {
    'config.port': '8080'
  }
};
```


### Options

<dl>

  <dt>backupPath</dt>
  <dd>
    <em>Type:</em> <code>String</code><br />
    <em>Default:</em> <code>'./package.json.backup'</code>
  </dd>
  <dd>Specifies the location and filename to which the <code>package.json</code> will be backed up.</dd>

  <dt>indent</dt>
  <dd>
    <em>Type:</em> <code>String | Number</code><br />
    <em>Default:</em> <code>2</code>
  </dd>
  <dd>
    Defines the indentation that's used to format the cleaned <code>package.json</code>. See the <code>space</code> parameter of <code>JSON.stringify</code> for <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters">more information</a>.
  </dd>

  <dt>remove</dt>
  <dd>
    <em>Type:</em> <code>String[] | (keys: String[]) => String[]</code>
  </dd>
  <dd>
    <p>Specifies the keys to be removed from the cleaned <code>package.json</code>; otherwise, <code>null</code> when nothing is to be removed.</p>
    <p>Deeper keys can be accessed using a dot (e.g., <code>'key.keyInsideKey'</code>). Likewise, arrays are accessible using brackets (e.g., <code>'key.arrKey[0]'</code>).</p>
    <p>To remove keys that contain a dot, the dot must be escaped. For example, <code>'exports.\\.'</code> will target <code>"exports": { "." }</code></p>
  </dd>

  <dt>replace</dt>
  <dd>
    <em>Type:</em> <code>Object | (pairs: Object) => Object</code>
  </dd>
  <dd>
    <p>Specifies the keys to be replaced in the cleaned <code>package.json</code>; otherwise, <code>null</code> when nothing is to be replaced.</p>
    <p>Deeper keys and arrays are accessible in the same manner and allow dot escaping. Additionally, the replaced keys may receive any valid JSON value, including objects.</p>
  </dd>

  <dt>extends</dt>
  <dd>
    <em>Type:</em> <code>String | String[]</code>
  </dd>
  <dd>
    <p>Specifies the name/s of a shareable configuration.</p>
    <p>This package <a href="https://github.com/roydukkey/clean-package/blob/master/common.js">shares a configuration</a> with common settings that can be extended from <code>clean-package/common</code>.
  </dd>

  <dt>onClean</dt>
  <dd>
    <em>Type:</em> <code>(hasChanged: boolean, config: CompiledConfig) => void</code>
  </dd>
  <dd>Notified after the <code>package.json</code> has been cleaned, supplied with an indication as to whether there were changes and the compiled configuration.</dd>

  <dt>onRestore</dt>
  <dd>
    <em>Type:</em> <code>(hasChanged: boolean, config: CompiledConfig) => void</code>
  </dd>
  <dd>Notified after the <code>package.json</code> has been restored, supplied with an indication as to whether there were changes and the compiled configuration.</dd>

</dl>

## Command Line Usage

```
clean-package [[<source-path>] <backup-path>] [<option>...]

where <option> is one of:

  -c,  --config <path>                  Specify the path to a configuration file.

  -e,  --extends <name>...              Specify the name to a shareable configuration. (e.g. 'clean-package/common')

  -i,  --indent <value>                 Specify the indentation, overriding configuration from file.

  -rm, --remove <key>...                Specify the keys to remove, overriding configuration from file.

       --remove-add <key>...            Same as --remove without overriding configuration from file.

  -r,  --replace <key>=<value>...       Specify the keys to replace, overriding configuration from file.

       --replace-add <key>=<value>...   Same as --replace without overriding configuration from file.

       --print-config                   Print the combined configuration without executing command.

  -v,  --version                        Print the version number
```

```
clean-package restore [[<source-path>] <backup-path>] [<option>...]

alias: r

where <option> is one of:

  -c,  --config <path>                  Specify the path to a configuration file.

  -e,  --extends <name>...              Specify the name to a shareable configuration. (e.g. 'clean-package/common')

       --print-config                   Print the combined configuration without executing command.
```

## Usage in Code

Should you desire, it is also possible to interface this package through code. Simply import the package like any other.

```ts
import { load, clean, restore, version } from 'clean-package';
```

## Troubleshooting

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
