/* eslint-disable no-var, @typescript-eslint/naming-convention */


declare var testDistPackages: boolean;
declare var configurePackages: <F, P extends [string, ...F[]]> (srcPackage: P, ...otherPackages: P[]) => P[];
declare var alterWorkingDirectory: (groupName: string, testName: string) => void;
declare var restoreWorkingDirectory: () => void;
