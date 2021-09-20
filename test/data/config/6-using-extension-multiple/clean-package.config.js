import { resolve } from 'path';


module.exports = {
	extends: [
		resolve(process.cwd(), './1.json'),
		resolve(process.cwd(), './2.json')
	]
};
