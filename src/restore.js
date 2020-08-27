'use strict';

const fs = require('fs');


module.exports = (options) => {

	// Restore backup
	if (fs.existsSync(options.backupPath)) {
		fs.renameSync(options.backupPath, options.sourcePath);
	}

};
