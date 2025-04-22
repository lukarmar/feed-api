import { UserRepositoryInterface } from "@domain/user/repositories";


export const UserRepositoryMock: jest.Mocked<UserRepositoryInterface> = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}
  