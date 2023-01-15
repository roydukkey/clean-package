// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.

import type { CliReplaceMap } from '../spec/CliOptions.js';
import type { Entries, Entry } from 'type-fest';


export function coerce (pairs: string[]): CliReplaceMap {
	const entries = pairs.reduce<Entries<CliReplaceMap>>((accumulator, pair) => {
		if (pair.includes('=')) {
			const [key, value] = pair.split('=', 2) as Entry<CliReplaceMap>;

			accumulator.push([
				key,
				Number(value) || (
					value === 'true' ? true :
					value === 'false' ? false :
					value === 'null' ? null :
					value
				)
			]);
		}
		return accumulator;
	}, []);

	return Object.fromEntries(entries);
}
