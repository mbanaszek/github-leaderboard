export const isNil = <T>(v: T | null | undefined): v is null | undefined => v === null || v === undefined;
export const isNotNil = <T>(v: T | null | undefined): v is T => v !== null && v !== undefined;
export const isTrue = (v: boolean): v is true => v === true;
export const isFalse = (v: boolean): v is true => v === false;