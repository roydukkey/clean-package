const { resolve } = require('path');

const sourcePath = './custom.json';

module.exports = [

	require(resolve(process.cwd(), sourcePath)),

	{
		sourcePath: resolve(process.cwd(), sourcePath),
		backupPath: resolve(process.cwd(), './5-config-override-string.bak'),
		indent: 5,
		remove: [
			'5a'
		],
		replace: {}
	}

];
