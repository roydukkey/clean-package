// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

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
