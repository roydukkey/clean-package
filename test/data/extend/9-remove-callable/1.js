import { resolve } from 'path';


module.exports = {
	extends: resolve(process.cwd(), './2.json'),
	remove: (keys) => ['a', ...keys, 'y', 'z']
};
