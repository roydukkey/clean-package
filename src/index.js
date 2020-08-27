'use strict';

const [options, packageJson] = require('./options');


// Route command to 'restore' otherwise 'clean'
require(options.isRestore ? './restore' : './clean.js')(options, packageJson);
