'use strict';


module.exports = (options) => {
	if (options && options.extends) {
		guaranteeArray(options);

		while (options.extends.length > 0) {
			options = applyPackage(options.extends.pop(), options);
		}

		delete options.extends;
	}

	return options;
};


function applyPackage (packageName, childConfig) {
	const parentConfig = require(packageName);

	// Handle extends before merging other options
	if (parentConfig.extends) {
		guaranteeArray(parentConfig);
		childConfig.extends.unshift(...parentConfig.extends);
		delete parentConfig.extends;
	}

	// Shallow merge options
	const mergedConfig = Object.assign({}, parentConfig, childConfig);

	// Merge deeper options, instead of blowing them away entirely
	if (parentConfig.remove && childConfig.remove) {
		mergedConfig.remove = [...new Set(parentConfig.remove.concat(childConfig.remove))];
	}

	if (parentConfig.replace) {
		mergedConfig.replace = Object.assign({}, parentConfig.replace, childConfig.replace);
	}

	return mergedConfig;
};


function guaranteeArray (options) {
	if (typeof options.extends === 'string') {
		options.extends = [options.extends];
	}
}
