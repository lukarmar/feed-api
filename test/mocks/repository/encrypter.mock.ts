import { Encrypter } from "@core/types";

export const EncrypterMock: jest.Mocked<Encrypter> = {
  decodeToken: jest.fn(),
  encrypt: jest.fn(),
}