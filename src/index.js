'use strict';

const [isRestore, options, packageJson, printConfig] = require('./options');


if (printConfig) {
	console.log(JSON.stringify(options, null, 2));
}


// Route command to 'restore' otherwise 'clean'
else {
	require(isRestore ? './restore' : './clean.js')(options, packageJson);
}
