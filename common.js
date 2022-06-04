// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.


const { config: { namespace } } = require('./package.json');


/**
 * This configuration can be extended using the 'extends' property in another configuration file or using the following command:
 *
 *   `clean-package --extends 'clean-package/common'`
 *
 * Is something missing? Submit an issue with your suggestion.
 */
module.exports = {
	remove: [
		namespace,
		'babel',
		'browserslist',
		'eslintConfig',
		'jest',
		'lint-staged', // https://github.com/okonet/lint-staged
		'mocha',
		'pre-commit' // https://github.com/observing/pre-commit
	]
};
