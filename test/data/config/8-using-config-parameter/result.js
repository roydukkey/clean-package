const { resolve } = require('path');
const { defaults } = require('../../../../src/spec/defaults');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './8-using-config-parameter.bak'),
	indent: defaults.indent,
	remove: [],
	replace: {}
};
