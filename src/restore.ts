// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { CompiledConfig } from './spec';
import { existsSync, renameSync } from 'fs';


/**
 * Restores the backed up file.
 *
 * @param sourcePath - The original path of the backed up file.
 * @param backupPath - The path to the backup file.
 */
export const restore = (config: CompiledConfig): void => {

	const exists = existsSync(config.backupPath);

	if (exists) {
		renameSync(config.backupPath, config.sourcePath);
	}

	if (config.onRestore) {
		config.onRestore(exists, config);
	}

};
