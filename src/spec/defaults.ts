// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { name } from '../../package.json';


export const defaults = {
	sourcePath: './package.json',
	backupPath: (sourcePath: string): string => `${sourcePath}.backup`,
	configs: [`./${name}.config.json`, `./${name}.config.js`],
	indent: 2
};
