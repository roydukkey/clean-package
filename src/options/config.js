'use strict';

const fs = require('fs');
const path = require('path');
const extend = require('./extend');


module.exports = (cliOptions, cliConfigPath) => {

	// Require 'package.json'
	const [packageJson, sourcePath] = readConfigFromFile(cliOptions.sourcePath || './package.json', true);

	// Attempt to find config from either (1) the CLI provided path or (2) the 'package.json'
	let options = cliConfigPath
		? readConfigFromFile(cliConfigPath, true)[0]
		: packageJson['clean-package'];

	// If package doesn't contain configuration, search 'clean-package.config.json', then 'clean-package.config.js'
	if (!options) {
		for (const file of ['./clean-package.config.json', './clean-package.config.js']) {
			if ([options] = readConfigFromFile(file)) {
				break;
			}
		}
	}

	// If a string was passed assume it is a config path
	else if (typeof options === 'string') {
		[options] = readConfigFromFile(options, true);
	}

	// Handle extension packages
	if (cliOptions.extends) {
		if (options) {
			options = {};
		}

		options.extends = cliOptions.extends;
	}

	options = extend(options);

	// Merge into default configuration, keeping required configuration fields
	options = Object.assign({
		sourcePath: undefined,
		backupPath: './package.json.backup',
		indent: 2,
		remove: [
			'clean-package'
		]
	}, options, {
		sourcePath
	});

	// Resolve backup file location
	options.backupPath = resolvePath(cliOptions.backupPath || options.backupPath);

	// Delete handled cliOptions
	delete cliOptions.sourcePath;
	delete cliOptions.backupPath;
	delete cliOptions.extends;

	// Export options and 'package.json' content
	return [options, packageJson];

};


/**
 * Returns the contents of the file from the given path, and the resolved path.
 * @param {string} filePath - The path to the file which will be read.
 * @param {*} isRequired - Whether or not the file is required and should fail when not found.
 */
function readConfigFromFile (filePath, isRequired = false) {
	filePath = resolvePath(filePath);
	return [
		isRequired || fs.existsSync(filePath) ? require(filePath) : null,
		filePath
	];
}

function resolvePath (filePath) {
	return path.resolve(process.cwd(), filePath);
}
