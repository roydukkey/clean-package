// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import { version as packageVersion } from '../package.json';


/**
 * Returns the version of `clean-package`.
 */
export const version = (): string => `v${packageVersion}`;
