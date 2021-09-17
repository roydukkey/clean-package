module.exports = {
	extends: './2.json',
	remove: (keys) => ['a', ...keys, 'y', 'z']
};
