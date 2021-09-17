// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { restore as dist } from 'clean-package';
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

		beforeEach(() => {
			jest.resetModules();
		});

		afterEach(() => {
			restoreWorkingDirectory();
		});

		describe('restore()', () => {

			test('Does not fail for missing backup', () => {
				alterWorkingDirectory(group, '1-default');

				const sourcePath = resolvePath('./package.json.clean');
				const backupPath = resolvePath('./xxx.json');

				restore(sourcePath, backupPath);

				// Backed up file does not exist
				let resulted: unknown = false;
				let expected: unknown = existsSync(backupPath);
				expect(resulted).toEqual(expected);

				// Restored file does not  exist
				resulted = false;
				expected = existsSync(sourcePath);
				expect(resulted).toEqual(expected);
			});

			test('Restores backup', () => {
				alterWorkingDirectory(group, '1-default');

				const sourcePath = resolvePath('./package.json.clean');
				const backupPath = resolvePath('./backed-up-package.json');

				restore(sourcePath, backupPath);

				// Backed up file does not exist
				let resulted: unknown = false;
				let expected: unknown = existsSync(backupPath);
				expect(resulted).toEqual(expected);

				// Restored file exists
				resulted = true;
				expected = existsSync(sourcePath);
				expect(resulted).toEqual(expected);

				// Restore
				renameSync(sourcePath, backupPath);
			});

		});

	});
});


function resolvePath (path: string): string {
	return resolve(process.cwd(), path);
}