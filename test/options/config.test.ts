// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { config } from '../../src/options/config';
import { resolve } from 'path';


const group = 'config';


describe('\'src\' Package', () => {

	beforeEach(() => {
		jest.resetModules();
	});

	afterEach(() => {
		restoreWorkingDirectory();
	});

	describe('Compile configuration', () => {

		test('Compiles with completely empty configuration', () => {
			alterWorkingDirectory(group, '1-empty-package');

			const resulted = config(resolveSource('./package.json'));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);

			const resultedKeyOrder = Object.keys(resulted);
			const expectedKeyOrder = Object.keys(expected);
			expect(resultedKeyOrder).toStrictEqual(expectedKeyOrder);
		});

		const sourcePath = 'input.json';

		test('Compiles using JSON configuration', () => {
			alterWorkingDirectory(group, '2-using-config-json');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using JS configuration', () => {
			alterWorkingDirectory(group, '3a-using-config-js');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using JS configuration (ESM)', () => {
			alterWorkingDirectory(group, '3b-using-config-mjs');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using JS configuration (CommonJS)', () => {
			alterWorkingDirectory(group, '3c-using-config-cjs');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using custom configuration', () => {
			alterWorkingDirectory(group, '4-using-config-custom');

			const resulted = config(resolveSource(sourcePath), resolveSource('custom.config.js'));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using single extension', () => {
			alterWorkingDirectory(group, '5-using-extension-single');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using multiple extensions', () => {
			alterWorkingDirectory(group, '6-using-extension-multiple');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using remove callback', () => {
			alterWorkingDirectory(group, '7-using-callable-remove');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles using config parameter', () => {
			alterWorkingDirectory(group, '8-using-config-parameter');

			const resulted = config(resolveSource(sourcePath), {
				backupPath: './8-using-config-parameter.bak'
			});
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles with onClean and onRestore', () => {
			alterWorkingDirectory(group, '9-lifecycle-events');

			const resulted = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);
		});

		test('Compiles with multiple onClean and onRestore events', () => {
			alterWorkingDirectory(group, '10-lifecycle-events-multiple');

			const { onClean, onRestore, ...resulted } = config(resolveSource(sourcePath));
			const expected = buildExpectation();
			expect(resulted).toStrictEqual(expected);

			const spy = jest.spyOn(console, 'log').mockImplementation();

			onClean?.(false, { ...resulted });

			expect(spy).toHaveBeenCalledTimes(2);
			expect(spy.mock.calls).toEqual([
				['10-clean-1'],
				['10-clean-2']
			]);

			spy.mockReset();

			onRestore?.(false, { ...resulted });

			expect(spy).toHaveBeenCalledTimes(2);
			expect(spy.mock.calls).toEqual([
				['10-restore-1'],
				['10-restore-2']
			]);

			spy.mockRestore();
		});

	});

});


function resolveSource (sourcePath: string): string {
	return resolve(process.cwd(), sourcePath);
}


function buildExpectation (): ReturnType<typeof config> {
	return require(resolve(process.cwd(), './result.js'));
}
