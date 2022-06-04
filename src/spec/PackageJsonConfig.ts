// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import type { JsonDocument } from './Json';
import type { Config, LifecycleEvents, MutationSets, NonCallableMutationSets } from './Config';


export interface PackageJsonConfig extends JsonDocument {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'clean-package': string | Partial<Omit<Config, MutationSets | LifecycleEvents> & NonCallableMutationSets>;
}
