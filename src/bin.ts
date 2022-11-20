// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { fileURLToPath } from 'node:url';
import { hideBin } from 'yargs/helpers';
import { readFile } from 'node:fs/promises';
import yargs from 'yargs';
import type { Argv, Options } from 'yargs';
import type { Entries, Entry, PackageJson, SetRequired } from 'type-fest';
import { dirname, join } from 'node:path';


const { name } = await loadPackageJson();


function commonBuilder (yargs: Argv, command: string, options: { [key: string]: Options }): Argv {
	return yargs
		.usage(['Usage: $0', command, '[[<source-path>] <backup-path>] [options...]'].filter(Boolean).join(' '))
		.positional('source-path', {
			describe: 'The path and filename to the package.json file that will be modified',
			type: 'string',
			normalize: true
		})
		.positional('backup-path', {
			describe: 'The path and filename to which the <source-path> will be backed up',
			type: 'string',
			normalize: true
		})
		.options({
			config: {
				describe: 'The path to a configuration file',
				alias: 'c',
				type: 'string',
				normalize: true
			},
			extends: {
				describe: `The name to a shareable configuration (e.g. '${name}/common')`,
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


await yargs(hideBin(process.argv))
	.wrap(105)
	.scriptName(name)

	.command({
		command: '$0',
		describe: '',
		builder: (yargs) =>
			commonBuilder(yargs, '', {
				indent: {
					describe: 'Change the indentation used in the cleaned file',
					alias: 'i',
					type: 'string'
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
					coerce: coerceKeyValue
				},
				'replace-add': {
					describe: 'Specify the keys to replace, without overriding configuration from file',
					type: 'string',
					array: true
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
		builder: (yargs) =>
			commonBuilder(yargs, 'restore', {})
		,
		handler: (args) => {
			console.log('Restore>>>', args);
		}
	})
	.parse();


async function loadPackageJson (): Promise<SetRequired<PackageJson, 'name'>> {
	const path = join(dirname(fileURLToPath(import.meta.url)), '../package.json');
	return JSON.parse(await readFile(path, 'utf-8')) as SetRequired<PackageJson, 'name'>;
}


// Move out to spec
interface Temp {
	[key: string]: string | number | boolean | null;
}

function coerceKeyValue (pairs: string[]): Temp {
	const entries = pairs.reduce<Entries<Temp>>((accumulator, pair) => {
		if (pair.includes('=')) {
			const [key, value] = pair.split('=', 2) as Entry<Temp>;

			accumulator.push([
				key,
				Number(value) || (
					value === 'true' ? true :
					value === 'false' ? false :
					value === 'null' ? null :
					value
				)
			]);
		}
		return accumulator;
	}, []);

	return Object.fromEntries(entries);
}
