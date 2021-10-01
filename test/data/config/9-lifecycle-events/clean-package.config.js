module.exports = {
	backupPath: './9-lifecycle-events.bak',
	indent: 9,
	remove: [
		'9a'
	],
	replace: {
		'9b': 'abc'
	},
	onClean: () => '9-clean',
	onRestore: () => '9-restore'
};
