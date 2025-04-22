export interface UserCaseType<T, R> {
  execute: (input: T) => Promise<R>;
}