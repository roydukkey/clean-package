import { resolve } from 'path';


module.exports = {
	extends: resolve(process.cwd(), './2.json'),
	replace: (pairs) => Object.fromEntries(Object.entries(pairs).map((pair) => {
		pair[1] += pair[1];
		return pair;
	}))
};
