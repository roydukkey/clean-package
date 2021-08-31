'use strict';


// Export config options and command-line specific options
module.exports = [{}, {}];


// Determine if 'restore' command is present
const isRestore = process.argv[2] === 'restore' || process.argv[2] === 'r';


// Remove NodeJS' first two paths and 'restore' command when present
const argv = process.argv.slice(2 + Number(isRestore));


// Get optional, positional arguments
if (argv.length) {

	// Get backup path as first argument
	if (!argv[0].startsWith('-')) {
		module.exports[0].backupPath = argv.shift();
	}

	// Get source path as second argument
	if (!argv[0].startsWith('-')) {
		[
			module.exports[0].sourcePath,
			module.exports[0].backupPath
		] = [
			module.exports[0].backupPath,
			argv.shift()
		];
	}

}


// Get other optional arguments
let optionKey;

module.exports = argv.reduce(([options, cliOnlyOptions], value) => {

	// Process option flag
	if (value.startsWith('-')) {

		// Add command to flag, to restrict options to particular command.
		if (isRestore) {
			value += '@restore';
		}

		switch (value) {
			case '--config': case '-c':
			case '--config@restore': case '-c@restore':
				optionKey = 'config';
				break;

			case '--print-config':
			case '--print-config@restore':
				cliOnlyOptions.printConfig = true;

			case '--extends':
			case '--extends@restore':
				optionKey = 'extends';
				options[optionKey] = [];
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

	// Add value following a valid option flag
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


module.exports.push(isRestore);


// Return abstracted primitive values from a string
function jsonPrimitive (value) {
	return Number(value) ||
		value === 'true' ? true
			: value === 'false' ? false
				: value === 'null' ? null
					: value;
}
