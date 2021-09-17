// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { resolve } from 'path';


export const resolvePath = (filePath: string): string => {
	return resolve(process.cwd(), filePath);
};
