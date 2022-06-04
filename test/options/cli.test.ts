// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import type { CliOptions, Command } from '../../src/Spec';


describe('\'src\' Package', () => {

	const preserveArgv = process.argv;
	const begin = process.argv.slice(0, 2);

	beforeEach(() => {
		jest.resetModules();
	});

	afterAll(() => {
		process.argv = preserveArgv;
	});

	function getOptions (): { command?: Command; options?: CliOptions } {
		return require('../../src/options/cli');
	}

	describe('CLI Command', () => {

		test('Resolves the clean command as default', () => {
			const resulted = getOptions().command;
			const expected = 'clean';
			expect(resulted).toBe(expected);
		});

		test('Resolves the restore command, full name', () => {
			process.argv = [...begin, 'restore'];

			const resulted = getOptions().command;
			const expected = 'restore';
			expect(resulted).toBe(expected);
		});

		test('Resolves the restore command, shortname', () => {
			process.argv = [...begin, 'r'];

			const resulted = getOptions().command;
			const expected = 'restore';
			expect(resulted).toBe(expected);
		});

		test('Resolves the version command over restore, full name', () => {
			process.argv = [...begin, 'restore', '--version'];

			const resulted = getOptions().command;
			let expected = 'restore';
			expect(resulted).not.toBe(expected);

			expected = 'version';
			expect(resulted).toBe(expected);
		});

		test('Resolves the version command over restore, shortname', () => {
			process.argv = [...begin, 'r', '-v'];

			const resulted = getOptions().command;
			let expected = 'restore';
			expect(resulted).not.toBe(expected);

			expected = 'version';
			expect(resulted).toBe(expected);
		});

		test('Resolves the show-config command over restore, full name', () => {
			process.argv = [...begin, 'restore', '--print-config'];

			const resulted = getOptions().command;
			let expected = 'restore';
			expect(resulted).not.toBe(expected);

			expected = 'show-config';
			expect(resulted).toBe(expected);
		});

		test('Resolves the show-config command over restore, shortname', () => {
			process.argv = [...begin, 'r', '--print-config'];

			const resulted = getOptions().command;
			let expected = 'restore';
			expect(resulted).not.toBe(expected);

			expected = 'show-config';
			expect(resulted).toBe(expected);
		});

		test('Resolves the version command over restore and show-config, full name', () => {
			process.argv = [...begin, 'restore', '--print-config', '--version'];

			const resulted = getOptions().command;
			let expected = 'restore';
			expect(resulted).not.toBe(expected);

			expected = 'print-config';
			expect(resulted).not.toBe(expected);

			expected = 'version';
			expect(resulted).toBe(expected);
		});

		test('Resolves the version command over restore and show-config, shortname', () => {
			process.argv = [...begin, 'r', '-v', '--print-config'];

			const resulted = getOptions().command;
			let expected = 'restore';
			expect(resulted).not.toBe(expected);

			expected = 'print-config';
			expect(resulted).not.toBe(expected);

			expected = 'version';
			expect(resulted).toBe(expected);
		});

	});

	describe('CLI Options', () => {

		describe('[[<source-path>] <backup-path>]', () => {

			test('Resolves the backup path', () => {
				process.argv = [...begin, './package.json.bak'];

				const resulted = getOptions().options?.backupPath;
				const expected = './package.json.bak';
				expect(resulted).toBe(expected);
			});

			test('Resolves the backup path with other options', () => {
				process.argv = [...begin, 'restore', './package.json.bak', '--print-config'];

				const resulted = getOptions().options?.backupPath;
				const expected = './package.json.bak';
				expect(resulted).toBe(expected);
			});

			test('Resolves the source and backup path', () => {
				process.argv = [...begin, './pack.json', './pack.json.bak'];
				const options = getOptions().options;

				let resulted = options?.sourcePath;
				let expected = './pack.json';
				expect(resulted).toBe(expected);

				resulted = options?.backupPath;
				expected = './pack.json.bak';
				expect(resulted).toBe(expected);
			});

			test('Resolves the source and backup path with other options', () => {
				process.argv = [...begin, 'r', './pack.json', './pack.json.bak', '-v', '--print-config'];
				const options = getOptions().options;

				let resulted = options?.sourcePath;
				let expected = './pack.json';
				expect(resulted).toBe(expected);

				resulted = options?.backupPath;
				expected = './pack.json.bak';
				expect(resulted).toBe(expected);
			});

		});

		describe('--config, -c', () => {

			test('Resolves the config path, full name', () => {
				process.argv = [...begin, '--config', './config.json'];

				const resulted = getOptions().options?.config;
				const expected = './config.json';
				expect(resulted).toBe(expected);
			});

			test('Resolves the config path, shortname', () => {
				process.argv = [...begin, '-c', './config-2.json'];

				const resulted = getOptions().options?.config;
				const expected = './config-2.json';
				expect(resulted).toBe(expected);
			});

			test('Resolves only the first path of a config declaration, full name', () => {
				process.argv = [...begin, '--config', './config-3.json', './config-4.json'];

				const resulted = getOptions().options?.config;
				const expected = './config-3.json';
				expect(resulted).toBe(expected);
			});

			test('Resolves only the first path of a config declaration, shortname', () => {
				process.argv = [...begin, '-c', './config-4.json', './config-3.json'];

				const resulted = getOptions().options?.config;
				const expected = './config-4.json';
				expect(resulted).toBe(expected);
			});

			test('Resolves the config path for restore', () => {
				process.argv = [...begin, 'restore', '--config', './config.json'];

				const resulted = getOptions().options?.config;
				const expected = './config.json';
				expect(resulted).toBe(expected);
			});

		});

		describe('--extends, -e', () => {

			test('Resolves extension package, full name', () => {
				process.argv = [...begin, '--extends', 'a/b'];

				const resulted = getOptions().options?.extends;
				const expected = ['a/b'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves extension package, shortname', () => {
				process.argv = [...begin, '-e', 'c'];

				const resulted = getOptions().options?.extends;
				const expected = ['c'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple packages of an extension declaration, full name', () => {
				process.argv = [...begin, '--extends', 'd/e', 'f'];

				const resulted = getOptions().options?.extends;
				const expected = ['d/e', 'f'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple packages of an extension declaration, shortname', () => {
				process.argv = [...begin, '-e', 'g', 'h/i'];

				const resulted = getOptions().options?.extends;
				const expected = ['g', 'h/i'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves extension packages for restore', () => {
				process.argv = [...begin, 'restore', '--extends', 'j', 'k/l'];

				const resulted = getOptions().options?.extends;
				const expected = ['j', 'k/l'];
				expect(resulted).toEqual(expected);
			});

		});

		describe('--indent, -i', () => {

			test('Resolves the indentation as number, full name', () => {
				process.argv = [...begin, '--indent', '0020'];

				const resulted = getOptions().options?.indent;
				const expected = 20;
				expect(resulted).toBe(expected);
			});

			test('Resolves the indentation as string, shortname', () => {
				process.argv = [...begin, '-i', '\t'];

				const resulted = getOptions().options?.indent;
				const expected = '\t';
				expect(resulted).toBe(expected);
			});

			test('Resolves only the first path of a config declaration, full name', () => {
				process.argv = [...begin, '--indent', '1', '2'];

				const resulted = getOptions().options?.indent;
				const expected = 1;
				expect(resulted).toBe(expected);
			});

			test('Resolves only the first path of a config declaration, shortname', () => {
				process.argv = [...begin, '-i', 'a3', '4'];

				const resulted = getOptions().options?.indent;
				const expected = 'a3';
				expect(resulted).toBe(expected);
			});

			test('Does not resolves the indentation for restore', () => {
				process.argv = [...begin, 'restore', '--indent', 'a'];

				const resulted = getOptions().options?.indent;
				const expected = 'a';
				expect(resulted).not.toBe(expected);
				expect(resulted).toBeUndefined();
			});

		});

		describe('--remove, -rm', () => {

			test('Resolves key to be removed, full name', () => {
				process.argv = [...begin, '--remove', '0020'];

				const resulted = getOptions().options?.remove;
				const expected = ['0020'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves key to be removed, shortname', () => {
				process.argv = [...begin, '-rm', 'abc'];

				const resulted = getOptions().options?.remove;
				const expected = ['abc'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple keys to be removed, full name', () => {
				process.argv = [...begin, '--remove', '123', 'f'];

				const resulted = getOptions().options?.remove;
				const expected = ['123', 'f'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple keys to be removed, shortname', () => {
				process.argv = [...begin, '-rm', 'great', 'scott'];

				const resulted = getOptions().options?.remove;
				const expected = ['great', 'scott'];
				expect(resulted).toEqual(expected);
			});

			test('Does not resolves keys to be removed for restore', () => {
				process.argv = [...begin, 'restore', '--remove', 'a'];

				const resulted = getOptions().options?.remove;
				const expected = ['a'];
				expect(resulted).not.toEqual(expected);
				expect(resulted).toBeUndefined();
			});

		});

		describe('--remove-add', () => {

			test('Resolves key to be removed', () => {
				process.argv = [...begin, '--remove-add', '0020'];

				const resulted = getOptions().options?.removeAdd;
				const expected = ['0020'];
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple keys to be removed', () => {
				process.argv = [...begin, '--remove-add', '123', 'f'];

				const resulted = getOptions().options?.removeAdd;
				const expected = ['123', 'f'];
				expect(resulted).toEqual(expected);
			});

			test('Does not resolves keys to be removed for restore', () => {
				process.argv = [...begin, 'restore', '--remove-add', 'a'];

				const resulted = getOptions().options?.removeAdd;
				const expected = ['a'];
				expect(resulted).not.toEqual(expected);
				expect(resulted).toBeUndefined();
			});

		});

		describe('--replace, -r', () => {

			test('Resolves key/value to be replaced, full name', () => {
				process.argv = [...begin, '--replace', '0020=a'];

				const resulted = getOptions().options?.replace;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const expected = { '0020': 'a' };
				expect(resulted).toEqual(expected);
			});

			test('Resolves key/value to be replaced, shortname', () => {
				process.argv = [...begin, '-r', 'abc=Pog'];

				const resulted = getOptions().options?.replace;
				const expected = { abc: 'Pog' };
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple key/values to be replaced, full name', () => {
				process.argv = [...begin, '--replace', '123=f', 'great=scott'];

				const resulted = getOptions().options?.replace;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const expected = { great: 'scott', 123: 'f' };
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple key/values to be replaced, shortname', () => {
				process.argv = [...begin, '-r', 'great=scott', '123=f'];

				const resulted = getOptions().options?.replace;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const expected = { great: 'scott', 123: 'f' };
				expect(resulted).toEqual(expected);
			});

			test('Resolves replacement value as number', () => {
				process.argv = [...begin, '-r', '0020=00010'];

				const resulted = getOptions().options?.replace;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const expected = { '0020': 10 };
				expect(resulted).toEqual(expected);
			});

			test('Resolves replacement value as boolean', () => {
				process.argv = [...begin, '-r', 'true=true', 'false=false'];

				const resulted = getOptions().options?.replace;
				const expected = { true: true, false: false };
				expect(resulted).toEqual(expected);
			});

			test('Resolves replacement value as null', () => {
				process.argv = [...begin, '-r', 'null=null'];

				const resulted = getOptions().options?.replace;
				const expected = { null: null };
				expect(resulted).toEqual(expected);
			});

			test('Does not resolves key/values to be replaced for restore', () => {
				process.argv = [...begin, 'restore', '--replace', 'a=1'];

				const resulted = getOptions().options?.replace;
				const expected = { a: 1 };
				expect(resulted).not.toEqual(expected);
				expect(resulted).toBeUndefined();
			});

			test('Quietly handles invalid key/value formats', () => {
				process.argv = [...begin, '--replace', '', '=', 'x=', 'x', '=x'];

				const resulted = getOptions().options?.replace;
				expect(resulted).toBeUndefined();
			});

		});

		describe('--replace-add', () => {

			test('Resolves key/value to be replaced, full name', () => {
				process.argv = [...begin, '--replace-add', '0020=a'];

				const resulted = getOptions().options?.replaceAdd;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const expected = { '0020': 'a' };
				expect(resulted).toEqual(expected);
			});

			test('Resolves multiple key/values to be replaced, full name', () => {
				process.argv = [...begin, '--replace-add', '123=f', 'great=scott'];

				const resulted = getOptions().options?.replaceAdd;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const expected = { great: 'scott', 123: 'f' };
				expect(resulted).toEqual(expected);
			});

			test('Resolves replacement value as number', () => {
				process.argv = [...begin, '--replace-add', '0020=00010'];

				const resulted = getOptions().options?.replaceAdd;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const expected = { '0020': 10 };
				expect(resulted).toEqual(expected);
			});

			test('Resolves replacement value as boolean', () => {
				process.argv = [...begin, '--replace-add', 'true=true', 'false=false'];

				const resulted = getOptions().options?.replaceAdd;
				const expected = { true: true, false: false };
				expect(resulted).toEqual(expected);
			});

			test('Resolves replacement value as null', () => {
				process.argv = [...begin, '--replace-add', 'null=null'];

				const resulted = getOptions().options?.replaceAdd;
				const expected = { null: null };
				expect(resulted).toEqual(expected);
			});

			test('Does not resolves key/values to be replaced for restore', () => {
				process.argv = [...begin, 'restore', '--replace-add', 'a=1'];

				const resulted = getOptions().options?.replaceAdd;
				const expected = { a: 1 };
				expect(resulted).not.toEqual(expected);
				expect(resulted).toBeUndefined();
			});

			test('Quietly handles invalid key/value formats', () => {
				process.argv = [...begin, '--replace-add', '', '=', 'x=', 'x', '=x'];

				const resulted = getOptions().options?.replaceAdd;
				expect(resulted).toBeUndefined();
			});

		});

	});

});
