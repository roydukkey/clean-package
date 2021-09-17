// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { version as packageVersion } from '../package.json';


/**
 * Returns the version of `clean-package`.
 */
export const version = (): string => `v${packageVersion}`;
