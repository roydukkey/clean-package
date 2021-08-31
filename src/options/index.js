'use strict';

const [cliOptions, cliOnlyOptions, isRestore] = require('./cli');
const [configOptions, packageJson] = require('./config')(cliOptions, cliOnlyOptions.config);


// Shallow merge options
const options = Object.assign({}, configOptions, cliOptions);


// Allow CLI specific options to insert values into configuration options, instead of blowing them away entirely
if (cliOnlyOptions.removeAdd) {
	options.remove = [...new Set(configOptions.remove.concat(cliOptions.remove))];
}

if (cliOnlyOptions.replaceAdd) {
	Object.assign(options.replace, configOptions.replace, cliOptions.replace);
}


module.exports = [isRestore, options, packageJson, cliOnlyOptions.printConfig];
