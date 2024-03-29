import { resolve } from 'path';


module.exports = {
	extends: [
		resolve(process.cwd(), './1.json'),
		resolve(process.cwd(), './2.json')
	],
	remove: (keys) => keys.map((key, index) => `${key}:${index + 1}`)
};
