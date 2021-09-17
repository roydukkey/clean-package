// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { CliOptions, Command } from '../spec';


// Determine if 'restore' command is present
const isRestore: boolean = process.argv[2] === 'restore' || process.argv[2] === 'r';
let $command: Command = isRestore ? 'restore' : 'clean';


const $options: CliOptions = {};


// Remove NodeJS' first two paths and 'restore' command when present
const argv = process.argv.slice(2 + Number(isRestore));


// Get optional, positional arguments
if (argv.length) {

	// Get backup path as first argument
	if (!argv[0].startsWith('-')) {
		$options.backupPath = argv.shift() as string; // SAFE given conditional
	}

	// Get source path as second argument
	if (argv[0] && !argv[0].startsWith('-')) {
		[
			$options.sourcePath,
			$options.backupPath
		] = [
			$options.backupPath as string, // SAFE given conditional
			argv.shift() as string // SAFE given conditional
		];
	}

}


// Get other optional arguments
let optionKey: keyof Pick<CliOptions, 'config' | 'extends' | 'indent' | 'remove' | 'removeAdd' | 'replace' | 'replaceAdd'> | undefined;


argv.forEach((value) => {

	// Process option flag
	if (value.startsWith('-')) {

		// Allows restricting options to 'clean', 'restore', or both
		const flag: `@${Command}` | '' = isRestore ? '@restore' : '';

		switch (value + flag) {

			case '-i':
			case '--indent':
				optionKey = 'indent';
				break;

			case '-rm':
			case '--remove':
				optionKey = 'remove';
				$options[optionKey] = [];
				break;

			case '--remove-add':
				optionKey = 'removeAdd';
				$options[optionKey] = [];
				break;

			case '-r':
			case '--replace':
				optionKey = 'replace';
				break;

			case '--replace-add':
				optionKey = 'replaceAdd';
				break;

			case `-c${flag}`:
			case `--config${flag}`:
				optionKey = 'config';
				break;

			case `-e${flag}`:
			case `--extends${flag}`:
				optionKey = 'extends';
				$options[optionKey] = [];
				break;

			case `-v${flag}`:
			case `--version${flag}`:
				$command = 'version';
				// falls through

			case `--print-config${flag}`:
				if ($command !== 'version') {
					$command = 'show-config';
				}
				// falls through

			default:
				optionKey = undefined;

		}

	}

	// Add value following a valid option flag
	else if (optionKey) {
		switch (optionKey) {

			case 'config':
				$options[optionKey] = value;
				optionKey = undefined;
				break;

			// Process as Array of Strings
			case 'extends':
			case 'remove':
			case 'removeAdd':
				$options[optionKey]?.push(value);
				break;

			// Process as Number or String
			case 'indent':
				$options[optionKey] = Number(value) || value;
				optionKey = undefined;
				break;

			// Process as Object
			case 'replace':
			case 'replaceAdd': {
				const index = value.indexOf('=');

				if (index >= 1 && index < value.length - 1) {
					const key = value.substring(0, index);
					value = value.substring(index + 1);

					const option = $options[optionKey] ?? {};

					option[key] = Number(value) || (
						value === 'true' ? true
							: value === 'false' ? false
								: value === 'null' ? null
									: value
					);

					$options[optionKey] = option;
				}
			}

		}
	}

});


export const options: CliOptions | undefined = Object.keys($options).length ? $options : undefined;
export const command: Command = $command;
