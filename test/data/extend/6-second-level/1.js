import { resolve } from 'path';


module.exports = {
	extends: [
		resolve(process.cwd(), './2.json')
	],
	backupPath: './6-second-level.bak'
};
