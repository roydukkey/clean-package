const { resolve } = require('path');

module.exports = {
	sourcePath: resolve(process.cwd(), 'input.json'),
	backupPath: resolve(process.cwd(), './2-using-config-json.bak'),
	indent: 2,
	remove: ['2a'],
	replace: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'2b': 123
	}
};
