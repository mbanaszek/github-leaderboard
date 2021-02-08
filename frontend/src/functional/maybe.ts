import { isNil } from "./logic";

export type Maybe<T> = T | null;

export const maybeWithDefault = <V>(defaultValue: V) => (maybe: Maybe<V>): V => (isNil(maybe) ? defaultValue : maybe);