// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { version as dist } from '../dist/main';
import { version as packageVersion } from '../package.json';
import { version as src } from '../src/version';


const packages = configurePackages(
	['src', src],
	['dist', dist]
);


packages.forEach(([name, version]) => {
	describe(`'${name}' Package`, () => {

		describe('version()', () => {

			test('Returns version in correct format', () => {
				const resulted = version();
				const expected = `v${packageVersion}`;
				expect(resulted).toBe(expected);
			});

		});

	});
});
