// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { Config } from '../spec';
import type { ExtendedConfig } from './extend';
import { distinctArray } from '../util/array';


export const merge = (child: Partial<Config>, { remove, replace, ...parent }: ExtendedConfig): ExtendedConfig => {
	const extendedConfig: ExtendedConfig = { remove, replace };

	// Merge incoming 'backupPath'
	if (child.backupPath) {
		extendedConfig.backupPath = child.backupPath;
	}
	else if (parent.backupPath) {
		extendedConfig.backupPath = parent.backupPath;
	}

	// Merge incoming 'indent'
	if (child.indent) {
		extendedConfig.indent = child.indent;
	}
	else if (parent.indent) {
		extendedConfig.indent = parent.indent;
	}

	// Merge incoming `remove`
	if (typeof child.remove === 'function') {
		extendedConfig.remove = distinctArray(child.remove(remove));
	}
	else if (child.remove) {
		extendedConfig.remove = distinctArray(remove.concat(child.remove));
	}

	// Merge incoming `replace`
	if (typeof child.replace === 'function') {
		extendedConfig.replace = child.replace(replace);
	}
	else if (child.replace) {
		extendedConfig.replace = { ...replace, ...child.replace };
	}

	return extendedConfig;
};
