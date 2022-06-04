const { resolve } = require('path');
const { onClean, onRestore } = require('./clean-package.config');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './9-lifecycle-events.bak'),
	indent: 9,
	remove: ['9a'],
	replace: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'9b': 'abc'
	},
	onClean,
	onRestore
};
