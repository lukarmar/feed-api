import { CreateUserUseCaseType } from "@domain/user/types/user-cases";

export const CreateUserUseCaseMock: jest.Mocked<CreateUserUseCaseType> = {
  execute: jest.fn(),
}