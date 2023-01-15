// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import type { Config } from './Config.js';


export interface CliOptions extends Config {

	/**
	 * The location and filename to additional configuration, overriding `./package.json` and `./clean-package.config.{json,js,mjs,cjs}` inherited configuration options if present.
	 */
	config?: string;

	/**
	 * The location and filename to the `package.json` file to clean up or restore.
	 */
	sourcePath?: string;

	/**
	 * The keys to be removed from the cleaned `package.json`, which will be added into the inherited configuration.
	 *
	 * Deeper keys can be accessed using a dot (e.g., `'key.keyInsideKey'`). Likewise, arrays are accessible using brackets (e.g., `'key.arrKey[0]'`).
	 *
	 * To remove keys that contain a dot, the dot must be escaped. For example, `'exports.\\.'` will target `"exports": { "." }`.
	 */
	removeAdd?: string[];
	remove?: string[];

	/**
	 * The keys to be replace from the cleaned `package.json`, which will be added into the inherited configuration.
	 *
	 * Deeper keys can be accessed using a dot (e.g., `'key.keyInsideKey'`). Likewise, arrays are accessible using brackets (e.g., `'key.arrKey[0]'`).
	 *
	 * To remove keys that contain a dot, the dot must be escaped. For example, `'exports.\\.'` will target `"exports": { "." }`.
	 */
	replaceAdd?: CliReplaceMap;
	replace?: CliReplaceMap;

}


export interface CliReplaceMap {
	[key: string]: string | number | boolean | null;
}
