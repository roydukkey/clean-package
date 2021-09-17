// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { existsSync } from 'fs';
import { resolvePath } from './path';
import type { Config, PackageJsonConfig } from '../spec';


export const requireFile = <T> (filePath: string): T extends PackageJsonConfig ? Omit<T, 'clean-package'> & Partial<Pick<T, 'clean-package'>> : Partial<Config> => {
	filePath = resolvePath(filePath);
	return require(filePath);
};


export const attemptFile = (filePath: string): Partial<Config> | undefined => {
	filePath = resolvePath(filePath);
	return existsSync(filePath) ? require(filePath) : undefined;
};
