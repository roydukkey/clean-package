// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { restore as dist } from '../dist/main';
import { resolve } from 'path';
import { restore as src } from '../src/restore';
import { existsSync, renameSync } from 'fs';


const group = 'restore';
const packages = configurePackages(
	['src', src],
	['dist', dist]
);


packages.forEach(([name, restore]) => {
	describe(`'${name}' Package`, () => {

		const baseConfig = {
			indent: 2,
			remove: [],
			replace: {}
		};

		beforeEach(() => {
			jest.resetModules();
		});

		afterEach(() => {
			restoreWorkingDirectory();
		});

		describe('restore()', () => {

			test('Does not fail for missing backup', () => {
				alterWorkingDirectory(group, '1-default');

				const config = {
					...baseConfig,
					sourcePath: resolvePath('./package.json.clean.json'),
					backupPath: resolvePath('./xxx.json')
				};

				restore(config);

				// Backed up file does not exist
				let resulted: unknown = existsSync(config.backupPath);
				let expected: unknown = false;
				expect(resulted).toEqual(expected);

				// Restored file does not  exist
				resulted = existsSync(config.sourcePath);
				expected = false;
				expect(resulted).toEqual(expected);
			});

			test('Restores backup', () => {
				alterWorkingDirectory(group, '1-default');

				const config = {
					...baseConfig,
					sourcePath: resolvePath('./package.json.clean.json'),
					backupPath: resolvePath('./backed-up-package.json')
				};

				restore(config);

				// Backed up file does not exist
				let resulted: unknown = existsSync(config.backupPath);
				let expected: unknown = false;
				expect(resulted).toEqual(expected);

				// Restored file exists
				resulted = existsSync(config.sourcePath);
				expected = true;
				expect(resulted).toEqual(expected);

				// Restore
				renameSync(config.sourcePath, config.backupPath);
			});

			test('Callback is triggered after package is restored', () => {
				alterWorkingDirectory(group, '2-restore-callback');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				const config = {
					...baseConfig,
					sourcePath: resolvePath('./package.json'),
					backupPath: resolvePath('./xxx.json'),
					onRestore: (hasChanged: boolean, config: unknown): void => console.log('2-restore', hasChanged, config)
				};

				restore(config);

				const resulted = existsSync(config.sourcePath);
				const expected = true;
				expect(resulted).toEqual(expected);

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls).toEqual([
					['2-restore', false, config]
				]);

				spy.mockRestore();
			});

		});

	});
});


function resolvePath (path: string): string {
	return resolve(process.cwd(), path);
}
