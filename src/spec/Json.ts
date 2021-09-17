// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


export interface JsonDocument {
	[key: string]: JsonValue;
}


export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
