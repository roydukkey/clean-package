'use strict';

const [options, packageJson, printConfig] = require('./options');


if (printConfig) {
	console.log(JSON.stringify(options, null, 2));
}


// Route command to 'restore' otherwise 'clean'
else {
	require(options.isRestore ? './restore' : './clean.js')(options, packageJson);
}
