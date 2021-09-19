// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { distinctArray } from './util/array';
import type { Config, ReplaceMap } from './spec';
import { clean, load, restore, version } from './index';
import { command, options } from './options/cli';


if ('version' === command) {
	console.log(version());
}


else {

	let optionsTransform: Config | undefined;

	if (options) {

		const { remove, removeAdd, replace, replaceAdd } = options;

		optionsTransform = options;

		// Blow away inherited values for `--remove`, and insert values for `--removeAdd`.
		optionsTransform.remove = (keys): string[] => {
			if (remove) {
				keys = remove;
			}

			if (removeAdd) {
				keys = distinctArray(keys.concat(removeAdd));
			}

			return keys;
		};

		// Blow away inherited values for `--replace`, and insert values for `--replaceAdd`.
		optionsTransform.replace = (pairs): ReplaceMap => {
			if (replace) {
				pairs = replace;
			}

			if (replaceAdd) {
				pairs = { ...pairs, ...replaceAdd };
			}

			return pairs;
		};

	}

	const [source, config] = load(options?.sourcePath, options?.config ?? optionsTransform);

	if ('restore' === command) {
		restore(config.sourcePath, config.backupPath);
	}

	else if ('show-config' === command) {
		console.log(JSON.stringify(config, null, 2));
	}

	else {
		clean(source, config);
	}

}
