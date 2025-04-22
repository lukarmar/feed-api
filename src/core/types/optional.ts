/**
 * Make a property optional
 *
 * @example
 * ```ts
 * type Foo = {
 *  id: string;
 *  name: string;
 *  age: number;
 * }
 *
 * type Bar = Optional<Foo, "age">
 * ```
 */

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
