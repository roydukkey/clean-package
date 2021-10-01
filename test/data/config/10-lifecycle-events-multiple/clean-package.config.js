import { resolve } from 'path';


module.exports = {
	extends: [
		resolve(process.cwd(), './1.js'),
		resolve(process.cwd(), './2.js')
	],
	backupPath: './10-lifecycle-events-multiple.bak',
	indent: '10',
	remove: [],
	replace: {}
};
