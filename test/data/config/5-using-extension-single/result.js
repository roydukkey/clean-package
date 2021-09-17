const { resolve } = require('path');
const { remove } = require('../../../../common');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './5-using-extension-single.bak'),
	indent: 5,
	remove,
	replace: {}
};
