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
export const restore = (sourcePath: CompiledConfig['sourcePath'], backupPath: CompiledConfig['backupPath']): void => {

	if (existsSync(backupPath)) {
		renameSync(backupPath, sourcePath);
	}

};
