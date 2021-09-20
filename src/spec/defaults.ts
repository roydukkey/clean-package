// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { config } from '../../package.json';


export const defaults = {
	sourcePath: './package.json',
	backupPath: (sourcePath: string): string => `${sourcePath}.backup`,
	configs: [`./${config.namespace}.config.json`, `./${config.namespace}.config.js`],
	indent: 2
};
