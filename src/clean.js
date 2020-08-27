'use strict';

const dot = require('dot-object');
const fs = require('fs');
const isDeepStrictEqual = require('util').isDeepStrictEqual;


module.exports = (options, packageJson) => {

	// Whether or not the contents of that 'package.json' has changed.
	let hasChanged = false;

	// Delete keys which are not needed in release package
	options.remove.forEach((value) => {
		if (dot.delete(value, packageJson) !== undefined && !hasChanged) {
			hasChanged = true;
		}
	});

	// Replace keys which should have different content in release package
	if (options.replace) {
		for (const [key, value] of Object.entries(options.replace)) {
			if (!isDeepStrictEqual(dot.pick(key, packageJson), value)) {
				dot.str(key, value, packageJson);
				hasChanged = true;
			}
		}
	}

	// If there are changes, write files
	if (hasChanged) {

		// Backup source file
		fs.renameSync(options.sourcePath, options.backupPath);

		// Write changes to package
		fs.writeFileSync(options.sourcePath, JSON.stringify(packageJson, null, options.indent));

	}
};
