// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { resolve } from 'path';


global.configurePackages = <F, P extends [string, ...F[]]> (srcPackage: P, ...otherPackages: P[]): P[] => {
	const packages: P[] = [srcPackage];

	if (global.testDistPackages) {
		packages.push(...otherPackages);
	}

	return packages;
};


const preserveCwd = process.cwd;


global.alterWorkingDirectory = (groupName: string, testName: string): void => {
	process.cwd = (): string => resolve(preserveCwd(), `./test/data/${groupName}/${testName}`);
};


global.restoreWorkingDirectory = (): void => {
	process.cwd = preserveCwd;
};
