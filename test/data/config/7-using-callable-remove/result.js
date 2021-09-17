const { resolve } = require('path');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './7-using-callable-remove.bak'),
	indent: '7',
	remove: ['a:1', 'b:2', 'c:3', 'x:4', 'z:5'],
	replace: {
		a: 4,
		b: 2,
		c: 3
	}
};
