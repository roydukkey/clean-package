'use strict';

module.exports = (childConfig) => {

	const parentConfig = require(childConfig.extends);

	delete childConfig.extends;

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
