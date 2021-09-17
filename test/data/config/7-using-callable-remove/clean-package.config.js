
module.exports = {
	extends: [
		'./1.json',
		'./2.json'
	],
	remove: (keys) => keys.map((key, index) => `${key}:${index + 1}`)
};
