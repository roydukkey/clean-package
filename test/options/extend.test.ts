// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { extend } from '../../src/options/extend';
import { resolve } from 'path';


const group = 'extend';


describe('\'src\' Package', () => {

	beforeEach(() => {
		jest.resetModules();
	});

	afterEach(() => {
		restoreWorkingDirectory();
	});

	describe('Extension resolution', () => {

		test('Succeeds for no extensions', () => {
			alterWorkingDirectory(group, '1-none');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for inherited `backupPath`', () => {
			alterWorkingDirectory(group, '2-backup');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for inherited `indent`', () => {
			alterWorkingDirectory(group, '3-indent');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for inherited `remove`', () => {
			alterWorkingDirectory(group, '4-remove');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for inherited `replace`', () => {
			alterWorkingDirectory(group, '5-replace');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for second level of extension', () => {
			alterWorkingDirectory(group, '6-second-level');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for second level of extension as string', () => {
			alterWorkingDirectory(group, '7-second-level-string');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for multiple of extensions', () => {
			alterWorkingDirectory(group, '8-multiple');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for callable `remove`', () => {
			alterWorkingDirectory(group, '9-remove-callable');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

		test('Succeeds for callable `replace`', () => {
			alterWorkingDirectory(group, '10-replace-callable');
			const [resulted, expected] = extendConfig();
			expect(resulted).toStrictEqual(expected);
		});

	});

});


function extendConfig (): [unknown, unknown] {
	return [
		extend(require(resolve(process.cwd(), './input.js'))),
		require(resolve(process.cwd(), './result.json'))
	];
}
