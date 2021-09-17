const { resolve } = require('path');

const sourcePath = './custom.json';

module.exports = [

	require(resolve(process.cwd(), sourcePath)),

	{
		sourcePath: resolve(process.cwd(), sourcePath),
		backupPath: resolve(process.cwd(), './4-config-override.bak'),
		indent: 4,
		remove: [
			'4a'
		],
		replace: {}
	}

];
