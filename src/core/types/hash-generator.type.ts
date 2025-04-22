export abstract class HashGenerator {
  abstract generateHash: (plainText: string) => Promise<string>;
}
