// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { merge } from './merge';
import type { CompiledConfig, Config, LifecycleEvents, MutationSets } from '../spec';


export const extend = (extensions: string | string[]): ExtendedConfig => {
	const extendedConfig: ExtendedConfig = { remove: [], replace: {} };

	if (typeof extensions === 'string') {
		extensions = [extensions];
	}

	return extensions.map((extension) => {
		let config = require(extension) as Partial<Config>;

		// Handling inner extensions
		if (config.extends) {
			config = merge(config, extend(config.extends));
		}

		return config;
	})

	.reduce((accumulator, config) => merge(config, accumulator), extendedConfig);
};


export type ExtendedConfig = Partial<Pick<CompiledConfig, 'backupPath' | 'indent'>> & Pick<CompiledConfig, MutationSets | LifecycleEvents>;
