// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

const { default: sequencer } = require('@jest/test-sequencer');
const { basename } = require('path');


const order = [
	'cli.test.ts',
	'extend.test.ts',
	'config.test.ts',
	'load.test.ts',
	'clean.test.ts',
	'restore.test.ts',
	'version.test.ts',
	'bin.test.ts'
];


class CustomSequencer extends sequencer {

	sort (tests) {
		const ordered = Array.from(tests).sort((a, b) => {
			a = basename(a.path);
			b = basename(b.path);

			const x = order.indexOf(a);
			const y = order.indexOf(b);

			if (x <= -1) {
				logError(a);
			}

			if (y <= -1) {
				logError(b);
			}

			return x - y;
		});

		if (errors.length) {
			console.log('\n');
		}

		return ordered;
	}

}


module.exports = CustomSequencer;


const errors = [];


function logError (file) {
	if (!errors.includes(file)) {
		if (!errors.length) {
			console.log('\n');
		}

		console.error(`No order is defined for test: ${file}`);
		errors.push(file);
	}
}
