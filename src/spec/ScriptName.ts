// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import type { PackageJson } from 'type-fest';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';


const path = join(dirname(fileURLToPath(import.meta.url)), '../../package.json');
const { name = 'clean-package' } = JSON.parse(await readFile(path, 'utf-8')) as PackageJson;


export default name;
