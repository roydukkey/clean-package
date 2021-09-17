const { resolve } = require('path');
const { defaults } = require('../../../../src/spec/defaults');

const sourcePath = './custom.json';

module.exports = [

	require(resolve(process.cwd(), sourcePath)),

	{
		sourcePath: resolve(process.cwd(), sourcePath),
		backupPath: resolve(process.cwd(), defaults.backupPath(sourcePath)),
		indent: defaults.indent,
		remove: [],
		replace: {}
	}

];
