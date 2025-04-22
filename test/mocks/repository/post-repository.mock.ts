import { PostRepositoryInterface } from "@domain/feed/repositories";

export const PostRepositoryMock: jest.Mocked<PostRepositoryInterface> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
}
  