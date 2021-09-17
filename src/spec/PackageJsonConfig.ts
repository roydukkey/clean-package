// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { JsonDocument } from './Json';
import type { Config, NonCallableConfigSets } from './Config';


export interface PackageJsonConfig extends JsonDocument {
	'clean-package': string | Partial<Omit<Config, 'remove' | 'replace'> & NonCallableConfigSets>;
}
