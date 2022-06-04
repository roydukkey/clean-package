module.exports = {
	backupPath: './9-lifecycle-events.bak',
	indent: 9,
	remove: [
		'9a'
	],
	replace: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'9b': 'abc'
	},
	onClean: () => '9-clean',
	onRestore: () => '9-restore'
};
