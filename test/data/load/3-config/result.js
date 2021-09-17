const { resolve } = require('path');

const sourcePath = './custom.json';

module.exports = [

	require(resolve(process.cwd(), sourcePath)),

	{
		sourcePath: resolve(process.cwd(), sourcePath),
		backupPath: resolve(process.cwd(), './3-config.bak'),
		indent: 3,
		remove: [],
		replace: {}
	}

];
