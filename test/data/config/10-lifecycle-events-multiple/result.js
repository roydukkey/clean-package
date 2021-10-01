const { resolve } = require('path');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './10-lifecycle-events-multiple.bak'),
	indent: '10',
	remove: [],
	replace: {}
};
