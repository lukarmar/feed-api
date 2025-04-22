export abstract class HashComparer {
  abstract compare(plainText: string, digest: string): Promise<boolean>;
}
