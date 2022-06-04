// Copyright (c) roydukkey. All rights reserved.
// Licensed under the MIT. See LICENSE file in the project root for full license information.


export interface JsonDocument {
	[key: string]: JsonValue;
}


export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
