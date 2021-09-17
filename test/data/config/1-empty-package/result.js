const { resolve } = require('path');
const { defaults } = require('../../../../src/spec/defaults');

module.exports = {
	sourcePath: resolve(process.cwd(), defaults.sourcePath),
	backupPath: resolve(process.cwd(), defaults.backupPath(defaults.sourcePath)),
	indent: defaults.indent,
	remove: [],
	replace: {}
};
