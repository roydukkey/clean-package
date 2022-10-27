// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { config } from '../../package.json';


export const defaults = {
	sourcePath: './package.json',
	backupPath: (sourcePath: string): string => `${sourcePath}.backup`,
	configs: [
		`./${config.namespace}.config.json`,
		`./${config.namespace}.config.js`,
		`./${config.namespace}.config.mjs`,
		`./${config.namespace}.config.cjs`
	],
	indent: 2
};
