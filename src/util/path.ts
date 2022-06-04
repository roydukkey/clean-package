// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { resolve } from 'path';


export const resolvePath = (filePath: string): string => {
	return resolve(process.cwd(), filePath);
};
