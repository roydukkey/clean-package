module.exports = {
	backupPath: './4-using-config-custom.bak',
	indent: 4,
	remove: [
		'4a'
	],
	replace: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'4b': {
			c: 4
		}
	}
};
