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


// Get other optional arguments
let optionKey;

module.exports = argv.reduce(([options, cliOnlyOptions], value) => {

	if (value.startsWith('-')) {

		if (options.isRestore) {
			value += '@restore';
		}

		switch (value) {
			case '--config': case '-c':
			case '--config@restore': case '-c@restore':
				optionKey = 'config';
				break;

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

		if (optionKey === 'config') {
			cliOnlyOptions.config = value;
			optionKey = undefined;
		}

		else if (options[optionKey] === undefined) {
			options[optionKey] = jsonPrimitive(value);
		}

		else if (Array.isArray(options[optionKey])) {
			options[optionKey].push(jsonPrimitive(value));
		}

		else {
			const index = value.indexOf('=');

			if (index >= 1 && index < value.length - 1) {
				options[optionKey][value.substring(0, index)] = jsonPrimitive(value.substring(index + 1));
			}
		}

	}

	return [options, cliOnlyOptions];

}, module.exports);


// Return abstracted primitive values from a string
function jsonPrimitive (value) {
	return Number(value) ||
		value === 'true' ? true
			: value === 'false' ? false
				: value === 'null' ? null
					: value;
}
