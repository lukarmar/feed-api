import { PostRepositoryMock, UserRepositoryMock } from "@test/mocks/repository";
import { faker } from '@faker-js/faker';
import { User } from "@domain/user/entities";
import { CreatePostUseCaseType } from "@domain/feed/types/user-cases";
import { CreatePostUseCase } from "@domain/feed/use-cases";
import { NotFoundException } from "@nestjs/common";
import { SessionDataUserHelper } from "@core/helpers";

describe('CreatePostUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let createPostUseCase: CreatePostUseCaseType;
  let sessionDataUserHelper: SessionDataUserHelper;

  const input = {
    content: faker.lorem.sentence(),
  }

  const userFixture = User.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  })

  beforeEach(() => {
    sessionDataUserHelper = new SessionDataUserHelper();

    createPostUseCase = new CreatePostUseCase(
      PostRepositoryMock,
      UserRepositoryMock,
      sessionDataUserHelper,
    );
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: userFixture.id,
      email: userFixture.email,
    });
  });

  it('should create a new post', async () => {
    UserRepositoryMock.findById.mockResolvedValue(userFixture);

    await createPostUseCase.execute(input);
    expect(PostRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        content: input.content,
        userId: userFixture.id,
      })
    );
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userFixture.id);
  })

  it('should throw NotFoundException if user is not found', async () => {
    UserRepositoryMock.findById.mockResolvedValue(null);

    await expect(createPostUseCase.execute(input)).rejects.toThrow(
      new NotFoundException("User not found")
    );
    expect(PostRepositoryMock.create).not.toHaveBeenCalled();
  })

  it('should throw BadRequestException if an error occurs', async () => {
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    PostRepositoryMock.create.mockRejectedValue(new Error("Database error"));

    await expect(createPostUseCase.execute(input)).rejects.toThrow(
      new Error("An error occurred while creating the post")
    );
  })
})