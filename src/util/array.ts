// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.


export const distinctArray = <T> (arr: T[]): T[] => [...new Set(arr)];
