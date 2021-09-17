// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


export const distinctArray = <T> (arr: T[]): T[] => [...new Set(arr)];
