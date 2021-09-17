const { resolve } = require('path');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './6-using-extension-multiple.bak'),
	indent: '6',
	remove: ['a', 'b', 'c', 'x', 'z'],
	replace: {
		a: 4,
		b: 2,
		c: 3
	}
};
