import { HashComparer } from "@core/types";

export const HashComparerMock: jest.Mocked<HashComparer> = {
  compare: jest.fn(),
}