/**
 * This configuration can be extended using the 'extends' property in another configuration file, or using the following command:
 *
 *   `clean-package --extends 'clean-package/common'`
 *
 * Is something missing? Submit an issue with your suggestion.
 */
module.exports = {
	remove: [
		'babel',
		'browserslist',
		'clean-package',
		'eslintConfig',
		'jest',
		'mocha',
		'pre-commit' // https://github.com/observing/pre-commit
	]
};
