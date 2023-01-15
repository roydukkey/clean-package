// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import type { CliOptions } from './CliOptions.js';
import type { JsonValue } from 'type-fest';


export interface Config {

	/**
	 * The names of shareable configuration packages which these options will extend.
	 */
	extends?: string[];

	/**
	 * The location and filename to which the `package.json` will be backed up.
	 */
	backupPath?: string;

	/**
	 * The indentation that is used to format the cleaned `package.json`.
	 *
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Parameters | JSON.stringify} JSON.stringify for more information on the space parameter.
	 */
	indent?: string | number;

	/**
	 * The keys to be removed from the cleaned `package.json`.
	 *
	 * Deeper keys can be accessed using a dot (e.g., `'key.keyInsideKey'`). Likewise, arrays are accessible using brackets (e.g., `'key.arrKey[0]'`).
	 *
	 * To remove keys that contain a dot, the dot must be escaped. For example, `'exports.\\.'` will target `"exports": { "." }`.
	 */
	remove?: NonCallableMutationSets['remove'] | ((keys: string[]) => string[]);

	/**
	 * The keys to be replaced in the cleaned `package.json`.
	 *
	 * Deeper keys can be accessed using a dot (e.g., `'key.keyInsideKey'`). Likewise, arrays are accessible using brackets (e.g., `'key.arrKey[0]'`).
	 *
	 * To remove keys that contain a dot, the dot must be escaped. For example, `'exports.\\.'` will target `"exports": { "." }`.
	 */
	replace?: NonCallableMutationSets['replace'] | ((pairs: ReplaceMap) => ReplaceMap);

	/**
	 * A callback to notify after the `package.json` has been cleaned, supplied with an indication as to whether there were changes and the compiled configuration.
	 */
	onClean?: (hasChanged: boolean, config: CompiledConfig) => void;

	/**
	 * A callback to notify after the `package.json` has been restored, supplied with an indication as to whether there were changes and the compiled configuration.
	 */
	onRestore?: (hasChanged: boolean, config: CompiledConfig) => void;

}


// eslint-disable-next-line @typescript-eslint/no-type-alias
export type CompiledConfig = Required<Pick<CliOptions, 'sourcePath'> & Omit<Config, 'extends' | MutationSets | LifecycleEvents> & NonCallableMutationSets> & Pick<Config, LifecycleEvents>;


export type LifecycleEvents = 'onClean' | 'onRestore';


export type MutationSets = 'remove' | 'replace';


export interface NonCallableMutationSets {
	remove: string[];
	replace: ReplaceMap;
}


export interface ReplaceMap {
	[key: string]: JsonValue;
}
