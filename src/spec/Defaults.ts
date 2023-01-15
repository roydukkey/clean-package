// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import scriptName from './ScriptName.js';


export default {
	sourcePath: './package.json',
	backupPath: (sourcePath: string): string => `${sourcePath}.backup`,
	configs: [
		`./${scriptName}.config.json`,
		`./${scriptName}.config.js`,
		`./${scriptName}.config.mjs`,
		`./${scriptName}.config.cjs`
	],
	indent: 2
};
