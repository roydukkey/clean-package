const { resolve } = require('path');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './3b-using-config-js.bak'),
	indent: 3,
	remove: ['3a'],
	replace: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'3b': 'abc'
	}
};
