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

		optionsTransform = options;

		// Allow '--remove-add' option to insert values into configuration options, instead of blowing them away entirely.
		if (options.removeAdd) {
			optionsTransform.remove = options.remove
				? distinctArray(options.remove.concat(options.removeAdd))
				: (keys): string[] => options?.removeAdd
					? distinctArray(keys.concat(options.removeAdd))
					: keys;
		}

		// Allow '--replace-add' option to insert values into configuration options, instead of blowing them away entirely.
		if (options.replaceAdd) {
			optionsTransform.replace = options.replace
				? { ...options.replace, ...options.replaceAdd }
				: (pairs): ReplaceMap => ({ ...pairs, ...options?.replaceAdd });
		}

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
