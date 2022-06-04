// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import type { Config } from './Config';


export interface CliOptions extends Config {

	/**
	 * The location and filename to additional configuration, overriding `./package.json` and `./clean-package.config.{js,json}` inherited configuration options if present.
	 */
	config?: string;

	/**
	 * The location and filename to the `package.json` file to clean up or restore.
	 */
	sourcePath?: string;

	/**
	 * The keys to be removed from the cleaned `package.json`, which will be added into the inherited configuration.
	 */
	removeAdd?: string[];
	remove?: string[];

	/**
	 * The keys to be replace from the cleaned `package.json`, which will be added into the inherited configuration.
	 */
	replaceAdd?: CliReplaceMap;
	replace?: CliReplaceMap;

}


export interface CliReplaceMap {
	[key: string]: string | number | boolean | null;
}
