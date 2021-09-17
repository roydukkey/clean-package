// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { CompiledConfig } from '../spec';
import { merge } from './merge';
import { requireFile } from '../util/require';


export const extend = (extensions: string | string[]): ExtendedConfig => {
	const extendedConfig: ExtendedConfig = { remove: [], replace: {} };

	if (typeof extensions === 'string') {
		extensions = [extensions];
	}

	return extensions.map((extension) => {
		let config = requireFile(extension);

		// Handling inner extensions
		if (config.extends) {
			config = merge(config, extend(config.extends));
		}

		return config;
	})

	.reduce((accumulator, config) => merge(config, accumulator), extendedConfig);
};


export type ExtendedConfig = Partial<Pick<CompiledConfig, 'backupPath' | 'indent'>> & Pick<CompiledConfig, 'remove' | 'replace'>;
