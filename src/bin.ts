// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { coerce } from './options/cli.js';
import defaults from './spec/Defaults.js';
import { hideBin } from 'yargs/helpers';
import scriptName from './spec/ScriptName.js';
import yargs from 'yargs';

import type { Argv, Options } from 'yargs';


const program = yargs(hideBin(process.argv));


function commonBuilder (program: Argv, command: string, options: { [key: string]: Options }): Argv {
	return program
		.usage(['Usage: $0', command, '[<source-path>] [<backup-path>] [options...]'].filter(Boolean).join(' '))
		.positional('source-path', {
			describe: 'The path and filename to the package.json file that will be modified',
			default: defaults.sourcePath,
			normalize: true
		})
		.positional('backup-path', {
			describe: 'The path and filename to which the <source-path> will be backed up',
			default: defaults.backupPath(defaults.sourcePath),
			normalize: true
		})
		.options({
			config: {
				describe: 'Change path to the configuration file',
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
		command: '$0',
		describe: '',
		builder: (program) =>
			commonBuilder(program, '', {
				indent: {
					describe: 'Change the indentation used in the cleaned file',
					alias: 'i',
					default: defaults.indent
				},
				remove: {
					describe: 'Specify the keys to remove, overriding configuration from file',
					alias: 'x',
					type: 'string',
					array: true
				},
				'remove-add': {
					describe: 'Specify the keys to remove, without overriding configuration from file',
					type: 'string',
					array: true
				},
				replace: {
					describe: 'Specify the keys to replace, overriding configuration from file',
					alias: 'r',
					type: 'string',
					array: true,
					coerce
				},
				'replace-add': {
					describe: 'Specify the keys to replace, without overriding configuration from file',
					type: 'string',
					array: true,
					coerce
				}
			})
		,
		handler: (args) => {
			console.log('Clean>>>', args);
		}
	})

	.command({
		command: 'restore',
		aliases: 'r',
		describe: '',
		builder: (program) =>
			commonBuilder(program, 'restore', {})
		,
		handler: (args) => {
			console.log('Restore>>>', args);
		}
	})
	.parse();
