'use strict';

const [cliOptions, cliOnlyOptions] = require('./cli');
const [configOptions, packageJson] = require('./config');


// Shallow merge options
const options = Object.assign({}, configOptions, cliOptions);


// Allow CLI specific options to insert values into configuration options, instead of blowing them away entirely
if (cliOnlyOptions.removeAdd) {
	options.remove = [...new Set(configOptions.remove.concat(cliOptions.remove))];
}

if (cliOnlyOptions.replaceAdd) {
	Object.assign(options.replace, configOptions.replace, cliOptions.replace);
}


// Export options and 'package.json' content
module.exports = [options, packageJson];
