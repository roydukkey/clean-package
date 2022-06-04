// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { defaults } from '../src/spec/defaults';
import { version as packageVersion } from '../package.json';
import { resolve } from 'path';
import { copyFileSync, existsSync, readdirSync, renameSync, rmSync } from 'fs';


const group = 'bin';
const packages = configurePackages(
	['src', '../src/bin'],
	['dist', '../bin/main']
);


packages.forEach(([name, binPath]) => {
	describe(`'${name}' Package`, () => {

		const preserveArgv = process.argv;
		const begin = process.argv.slice(0, 2);

		beforeEach(() => {
			jest.resetModules();
		});

		afterAll(() => {
			restoreWorkingDirectory();
			process.argv = preserveArgv;
		});

		function executeBin (): void {
			require(binPath);
		}

		describe('--version', () => {

			test('Prints version in correct format', () => {
				alterWorkingDirectory(group, '1-version.ignore');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				process.argv = [...begin, '--version'];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls).toEqual([[`v${packageVersion}`]]);

				// Ensure no files have been created.
				const resulted = !existsSync(resolvePath('./')) || readdirSync(resolvePath('./')).length === 0;
				const expected = true;
				expect(resulted).toEqual(expected);

				spy.mockRestore();
			});

		});

		describe('--print-config', () => {

			test('Prints config for default configuration', () => {
				alterWorkingDirectory(group, '2-print-config');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				process.argv = [...begin, '--print-config'];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls).toEqual([[resolveConfigAsString({
					sourcePath: resolvePath(defaults.sourcePath),
					backupPath: resolvePath(defaults.backupPath(defaults.sourcePath)),
					indent: defaults.indent,
					remove: [],
					replace: {}
				})]]);

				// Ensure no files have been created.
				const resulted = readdirSync(resolvePath('./')).length;
				const expected = 1;
				expect(resulted).toEqual(expected);

				spy.mockRestore();
			});

			test('Prints config correct config for --remove', () => {
				alterWorkingDirectory(group, '3-print-config-remove');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				process.argv = [...begin, '--print-config', '--remove', 'x', 'y', 'b', 'z'];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls).toEqual([[resolveConfigAsString({
					sourcePath: resolvePath(defaults.sourcePath),
					backupPath: resolvePath(defaults.backupPath(defaults.sourcePath)),
					indent: defaults.indent,
					remove: ['x', 'y', 'b', 'z'],
					replace: {}
				})]]);

				// Ensure no files have been created.
				const resulted = readdirSync(resolvePath('./')).length;
				const expected = 1;
				expect(resulted).toEqual(expected);

				spy.mockRestore();
			});

			test('Prints config correct config for --remove-add', () => {
				alterWorkingDirectory(group, '4-print-config-remove-add');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				process.argv = [...begin, '--print-config', '--remove-add', 'x', 'y', 'b', 'z'];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls).toEqual([[resolveConfigAsString({
					sourcePath: resolvePath(defaults.sourcePath),
					backupPath: resolvePath(defaults.backupPath(defaults.sourcePath)),
					indent: defaults.indent,
					remove: ['a', 'b', 'c', 'x', 'y', 'z'],
					replace: {}
				})]]);

				// Ensure no files have been created.
				const resulted = readdirSync(resolvePath('./')).length;
				const expected = 1;
				expect(resulted).toEqual(expected);

				spy.mockRestore();
			});

			test('Prints config correct config for --replace', () => {
				alterWorkingDirectory(group, '5-print-config-replace');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				process.argv = [...begin, '--print-config', '--replace', 'x=7', 'y=8', 'b=10', 'z=9'];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls).toEqual([[resolveConfigAsString({
					sourcePath: resolvePath(defaults.sourcePath),
					backupPath: resolvePath(defaults.backupPath(defaults.sourcePath)),
					indent: defaults.indent,
					remove: [],
					replace: {
						x: 7,
						y: 8,
						b: 10,
						z: 9
					}
				})]]);

				// Ensure no files have been created.
				const resulted = readdirSync(resolvePath('./')).length;
				const expected = 1;
				expect(resulted).toEqual(expected);

				spy.mockRestore();
			});

			test('Prints config correct config for --replace-add', () => {
				alterWorkingDirectory(group, '6-print-config-replace-add');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				process.argv = [...begin, '--print-config', '--replace-add', 'x=7', 'y=8', 'b=10', 'z=9'];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls).toEqual([[resolveConfigAsString({
					sourcePath: resolvePath(defaults.sourcePath),
					backupPath: resolvePath(defaults.backupPath(defaults.sourcePath)),
					indent: defaults.indent,
					remove: [],
					replace: {
						a: 1,
						b: 10,
						c: 3,
						x: 7,
						y: 8,
						z: 9
					}
				})]]);

				// Ensure no files have been created.
				const resulted = readdirSync(resolvePath('./')).length;
				const expected = 1;
				expect(resulted).toEqual(expected);

				spy.mockRestore();
			});

		});

		describe('clean', () => {

			test('Successfully cleans JSON file', () => {
				alterWorkingDirectory(group, '7-clean');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				const inputPath = resolvePath(defaults.sourcePath);
				const sourcePath = `${inputPath}.clean.json`;
				const backupPath = defaults.backupPath(defaults.sourcePath);

				copyFileSync(inputPath, sourcePath);

				process.argv = [...begin, sourcePath, backupPath];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(0);

				// Ensure no files have been created.
				const resulted = existsSync(resolvePath(backupPath));
				const expected = true;
				expect(resulted).toEqual(expected);

				cleanUpTest(resolvePath(sourcePath), resolvePath(backupPath));

				spy.mockRestore();
			});

		});

		describe('restore', () => {

			test('Successfully restores back up', () => {
				alterWorkingDirectory(group, '8-restore');
				const spy = jest.spyOn(console, 'log').mockImplementation();

				const sourcePath = resolvePath('./package.json.clean.json');
				const backupPath = resolvePath('./backed-up-package.json');

				copyFileSync(backupPath, sourcePath);

				process.argv = [...begin, 'restore', sourcePath, backupPath];
				executeBin();

				// Test output
				expect(spy).toHaveBeenCalledTimes(0);

				// Backed up file does not exist
				const resulted = existsSync(backupPath);
				const expected = false;
				expect(resulted).toEqual(expected);

				// Restore
				renameSync(sourcePath, backupPath);

				spy.mockRestore();
			});

		});

	});
});


function resolvePath (path: string): string {
	return resolve(process.cwd(), path);
}


function resolveConfigAsString (config: { [key: string]: unknown }): string {
	return JSON.stringify(config, null, 2);
}


function cleanUpTest (...paths: string[]): void {
	paths.forEach((path) => rmSync(path, { recursive: true, force: true }));
}
