// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { load as dist } from 'clean-package';
import { resolve } from 'path';
import { load as src } from '../src/load';


const group = 'load';
const packages = configurePackages(
	['src', src],
	['dist', dist]
);


packages.forEach(([name, load]) => {
	describe(`'${name}' Package`, () => {

		beforeEach(() => {
			jest.resetModules();
		});

		afterEach(() => {
			restoreWorkingDirectory();
		});

		describe('load()', () => {

			test('Loads package from default location without any configuration', () => {
				alterWorkingDirectory(group, '1-empty-default');
				const [resulted, expected] = loadPackage(load);
				expect(resulted).toStrictEqual(expected);
			});

			test('Loads package from custom location without any configuration', () => {
				alterWorkingDirectory(group, '2-empty-custom');
				const [resulted, expected] = loadPackage(load);
				expect(resulted).toStrictEqual(expected);
			});

			test('Loads package with configuration', () => {
				alterWorkingDirectory(group, '3-config');
				const [resulted, expected] = loadPackage(load);
				expect(resulted).toStrictEqual(expected);
			});

			test('Loads package with configuration override', () => {
				alterWorkingDirectory(group, '4-config-override');
				const [resulted, expected] = loadPackage(load);
				expect(resulted).toStrictEqual(expected);
			});

			test('Loads package with configuration override as string', () => {
				alterWorkingDirectory(group, '5-config-override-string');
				const [resulted, expected] = loadPackage(load);
				expect(resulted).toStrictEqual(expected);
			});

		});

	});
});


function loadPackage (load: typeof src): [unknown, unknown] {
	return [
		load(...require(resolve(process.cwd(), './input.js'))),
		require(resolve(process.cwd(), './result.js'))
	];
}
