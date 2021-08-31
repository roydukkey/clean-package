'use strict';

const [printVersion, printConfig, isRestore, options, packageJson] = require('./options');

if (printVersion) {
	console.log(`v${require('../package.json').version}`);
}


else if (printConfig) {
	console.log(JSON.stringify(options, null, 2));
}

// Route command to 'restore' otherwise 'clean'
else {
	require(isRestore ? './restore' : './clean.js')(options, packageJson);
}
