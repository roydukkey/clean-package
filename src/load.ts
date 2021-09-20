// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { config as compileConfig } from './options/config';
import { defaults } from './spec';
import { merge } from './options/merge';
import { config as packageConfig } from '../package.json';
import { requireFile } from './util/require';
import { resolvePath } from './util/path';
import type { CompiledConfig, Config, JsonDocument, PackageJsonConfig } from './spec';


/**
 * Returns the loaded JSON document and compiled configuration specifying how it should be cleaned.
 *
 * @param sourcePath - The path to the source JSON document.
 * @param config - The configuration that extends any configuration defined in the JSON document or other configuration files.
 */
export const load = (sourcePath: string = defaults.sourcePath, config?: string | Config): [JsonDocument, CompiledConfig] => {

	// Require 'package.json'
	sourcePath = resolvePath(sourcePath);
	const content = requireFile<PackageJsonConfig>(sourcePath);

	// Compile `package.json` configuration
	let compiledConfig = compileConfig(sourcePath, content[packageConfig.namespace as 'clean-package']);

	// Attempt to load configuration from the provided path
	if (typeof config === 'string') {
		config = requireFile(config);
	}

	// Prioritize incoming configuration over package configuration
	if (config) {
		compiledConfig = {
			...compiledConfig,
			...merge(config, compiledConfig)
		};
	}

	// Resolve backup file location
	compiledConfig.backupPath = resolvePath(compiledConfig.backupPath);

	return [
		content,
		compiledConfig
	];

};
