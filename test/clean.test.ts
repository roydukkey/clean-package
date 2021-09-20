// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { defaults } from '../src/spec/defaults';
import { resolve } from 'path';
import { clean as srcClean } from '../src/clean';
import { load as srcLoad } from '../src/load';
import { copyFileSync, existsSync, readFileSync, rmSync } from 'fs';
import { clean as distClean, load as distLoad } from '../dist/main';


const group = 'clean';
const packages = configurePackages(
	['src', srcClean, srcLoad],
	['dist', distClean, distLoad]
);

const defaultBackupPath = defaults.backupPath(defaults.sourcePath);


packages.forEach(([name, clean, load]) => {
	describe(`'${name}' Package`, () => {

		beforeEach(() => {
			jest.resetModules();
		});

		afterEach(() => {
			restoreWorkingDirectory();
		});

		describe('clean()', () => {

			test('Does not alter source or produce backup when there are no removals or replacements', () => {
				alterWorkingDirectory(group, '1-empty-default');

				clean(...load());

				const resulted = existsSync(resolvePath(defaultBackupPath));
				const expected = false;
				expect(resulted).toEqual(expected);
			});

			test('Cleans package for removals', () => {
				alterWorkingDirectory(group, '2-removals');

				const [source, config] = load();
				const backupPath = resolvePath(defaultBackupPath);

				copyFileSync(config.sourcePath, config.sourcePath += '.clean.json');

				clean(source, config);

				// Cleaned file exists
				let resulted: unknown = existsSync(backupPath);
				let expected: unknown = true;
				expect(resulted).toEqual(expected);

				// Source matches backed up file
				resulted = readFileSync(resolvePath(defaults.sourcePath)).toString();
				expected = readFileSync(config.backupPath).toString();
				expect(resulted).toEqual(expected);

				// Cleaned file contents matches expected result
				resulted = readFileSync(config.sourcePath).toString();
				expected = readFileSync(resolvePath('./result.txt')).toString();
				expect(resulted).toEqual(expected);

				cleanUpTest(config.sourcePath, config.backupPath);
			});

			test('Cleans package for replacements', () => {
				alterWorkingDirectory(group, '3-replacements');

				const [source, config] = load();
				const backupPath = resolvePath(defaultBackupPath);

				copyFileSync(config.sourcePath, config.sourcePath += '.clean.json');

				clean(source, config);

				// Cleaned file exists
				let resulted: unknown = existsSync(backupPath);
				let expected: unknown = true;
				expect(resulted).toEqual(expected);

				// Source matches backed up file
				resulted = readFileSync(resolvePath(defaults.sourcePath)).toString();
				expected = readFileSync(config.backupPath).toString();
				expect(resulted).toEqual(expected);

				// Cleaned file contents matches expected result
				resulted = readFileSync(config.sourcePath).toString();
				expected = readFileSync(resolvePath('./result.txt')).toString();
				expect(resulted).toEqual(expected);

				cleanUpTest(config.sourcePath, config.backupPath);
			});

			test('Does not alter source or produce backup when replacements already exist', () => {
				alterWorkingDirectory(group, '4-already-has-replacements');

				clean(...load());

				const resulted = existsSync(resolvePath(defaultBackupPath));
				const expected = false;
				expect(resulted).toEqual(expected);
			});

		});

	});
});


function resolvePath (path: string): string {
	return resolve(process.cwd(), path);
}


function cleanUpTest (...paths: string[]): void {
	paths.forEach((path) => rmSync(path, { recursive: true, force: true }));
}
