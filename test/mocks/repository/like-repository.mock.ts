import { LikeRepositoryInterface } from "@domain/feed/repositories";

export const LikeRepositoryMock: jest.Mocked<LikeRepositoryInterface> = {
  create: jest.fn(),
  update: jest.fn(),
  findByUserAndPost: jest.fn(),
}
  