// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { coerce } from './options/cli.js';
import defaults from './spec/Defaults.js';
import { hideBin } from 'yargs/helpers';
import scriptName from './spec/ScriptName.js';
import yargs from 'yargs';

import type { Argv, Options } from 'yargs';


enum Command {
	Clean = 'clean',
	Restore = 'restore'
}


const program = yargs(hideBin(process.argv));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function commandBuilder<T, O extends { [key: string]: Options }> (program: Argv<T>, command: Command, options: O) {

	return program
		// .usage(['$0', command === Command.Restore ? command : '', '[[source-path] backup-path]'].filter(Boolean).join(' '))
		.positional('source-path', {
			describe: `The path and filename ${command === Command.Clean
				? 'to the JSON file that will be modified'
				:	'to which the backed up JSON file will be restored'
			}`,
			default: defaults.sourcePath,
			normalize: true
		})
		.positional('backup-path', {
			describe: 'The path and filename to which the [source-path] will be backed up',
			default: defaults.backupPath(defaults.sourcePath),
			normalize: true
		})
		.options({
			config: {
				describe: 'Names of a shareable configuration',
				alias: 'c',
				normalize: true
			},
			extends: {
				describe: `The name to a shareable configuration (e.g. '${scriptName}/common')`,
				alias: 'e',
				type: 'string'
			},
			...options,
			'print-config': {
				describe: 'Print the combined configuration without executing command',
				type: 'boolean'
			}
		})
		.version()
		.help()
		.alias({
			v: 'version'
		});
}


await program
	.wrap(Math.min(130, program.terminalWidth()))
	.scriptName(scriptName)

	.command({
		command: '$0 [source-path] [backup-path]',
		builder: (program) => commandBuilder(program, Command.Clean, {
			indent: {
				describe: 'Change the indentation used in the cleaned file',
				alias: 'i',
				default: defaults.indent
			},
			remove: {
				describe: 'Keys to remove; overrides configuration from file',
				alias: 'x',
				type: 'string',
				array: true
			},
			'remove-add': {
				describe: 'Keys to remove; amends configuration from file',
				type: 'string',
				array: true
			},
			replace: {
				describe: 'Key/value pairs where the key will be replaced by the value; overrides configuration from file',
				alias: 'r',
				type: 'string',
				array: true,
				coerce
			},
			'replace-add': {
				describe: 'Key/value pairs where the key will be replaced by the value; amends configuration from file',
				type: 'string',
				array: true,
				coerce
			}
		}),
		handler: (args) => {
			console.log('Clean>>>', args);
		}
	})

	.command({
		command: 'restore [source-path] [backup-path]',
		aliases: 'r',
		// Seems there is a typing error with builder receiving positional arguments and options from other command. Asserting to clear them out.
		builder: (program) => commandBuilder(program as Argv<unknown>, Command.Restore, {}),
		handler: (args) => {
			console.log('Restore>>>', args);
		}
	})

	.parse();


// function correctPositionalArguments () {

// }
