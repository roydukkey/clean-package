'use strict';


// Determine if 'restore' command is present
var options = {
	isRestore: process.argv[2] === 'restore' || process.argv[2] === 'r'
};


// Remove NodeJS' first two paths and 'restore' command when present
var argv = process.argv.slice(2 + Number(options.isRestore));


// Get backup path as first optional, positional argument
if (argv.length && !argv[0].startsWith('-')) {
	options.backupPath = argv.shift();
}


// Export options and empty object for options which are specific to the command-line
module.exports = [options, {}];


// If not using 'restore' command, get other optional arguments
if (!options.isRestore) {
	let optionKey;

	module.exports = argv.reduce(([options, cliOnlyOptions], value) => {

		if (value.startsWith('-')) {

			switch (value) {
				case '--indent': case '-i':
					optionKey = 'indent';
					break;

				case '--removeAdd':
					cliOnlyOptions.removeAdd = true;

				case '--remove': case '-rm':
					optionKey = 'remove';
					options[optionKey] = [];
					break;

				case '--replaceAdd':
					cliOnlyOptions.replaceAdd = true;

				case '--replace': case '-r':
					optionKey = 'replace';
					options[optionKey] = {};
					break;

				default:
					optionKey = undefined;
			}

		}

		else if (optionKey !== undefined) {

			if (options[optionKey] === undefined) {
				options[optionKey] = jsonPrimitive(value);
			}

			else if (Array.isArray(options[optionKey])) {
				options[optionKey].push(jsonPrimitive(value));
			}

			else if (value.includes('=')) {
				const index = value.indexOf('=');
				options[optionKey][value.substring(0, index)] = jsonPrimitive(value.substring(index + 1));
			}

		}

		return [options, cliOnlyOptions];

	}, module.exports);
}


// Return abstracted primitive values from a string
function jsonPrimitive (value) {
	return Number(value) ||
		value === 'true' ? true
			: value === 'false' ? false
				: value === 'null' ? null
					: value;
}
