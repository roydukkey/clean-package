const { resolve } = require('path');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './4-using-config-custom.bak'),
	indent: 4,
	remove: ['4a'],
	replace: {
		'4b': {
			c: 4
		}
	}
};
