// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { defaults } from '../spec';
import { extend } from './extend';
import { merge } from './merge';
import { resolvePath } from '../util/path';
import type { CompiledConfig, Config } from '../spec';
import { attemptFile, requireFile } from '../util/require';


export const config = (sourcePath: string, config?: string | Config): CompiledConfig => {

	// Attempt to load configuration from the provided path
	if (typeof config === 'string') {
		config = requireFile(config);
	}

	// If package doesn't contain configuration, search for defaults
	else if (!config) {
		for (const file of defaults.configs) {
			config = attemptFile(file);
			if (config) {
				break;
			}
		}
	}

	// Build defaults
	let compiledConfig: CompiledConfig = {
		sourcePath,
		backupPath: defaults.backupPath(sourcePath),
		indent: defaults.indent,
		remove: [],
		replace: {}
	};

	// Merge configuration into defaults
	if (config) {
		compiledConfig = {
			...compiledConfig,
			...merge(config, extend(config.extends ?? []))
		};
	}

	// Resolve backup file location
	compiledConfig.backupPath = resolvePath(compiledConfig.backupPath);

	return compiledConfig;
};
