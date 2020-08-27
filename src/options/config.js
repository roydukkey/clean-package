'use strict';

const fs = require('fs');
const path = require('path');


// Require 'package.json'
const sourcePath = path.resolve(process.cwd(), './package.json');
const packageJson = require(sourcePath);


// Attempt to find config from 'package.json'
let options = packageJson['clean-package'];


// If package doesn't contain configuration, search 'clean-package.config.json', then 'clean-package.config.js'
if (!options) {
	for (const file of ['./clean-package.config.json', './clean-package.config.js']) {
		const configPath = path.resolve(process.cwd(), file);

		if (fs.existsSync(configPath)) {
			options = require(configPath);

			if (options) {
				break;
			}
		}
	}
}


// Merge into default configuration, keeping required configuration fields
options = Object.assign({
	backupPath: './package.json.backup',
	indent: 2,
	remove: [
		'clean-package'
	]
}, options, {
	sourcePath
});


// Resolve backup file location
options.backupPath = path.resolve(process.cwd(), options.backupPath);


// Export options and 'package.json' content
module.exports = [options, packageJson];
