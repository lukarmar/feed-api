import { LikeRepositoryMock, PostRepositoryMock, UserRepositoryMock } from "@test/mocks/repository";
import { faker } from '@faker-js/faker';
import { User } from "@domain/user/entities";
import { ToggleLikeUseCaseType } from "@domain/feed/types/user-cases";
import { ToggleLikeUseCase } from "./toggle-like.use-case";
import { Like, Post } from "@domain/feed/entities";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { SessionDataUserHelper } from "@core/helpers";

describe('ToggleLikeUseCase', () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-09-01T00:00:00.000Z'));

  let toggleLikeUseCase: ToggleLikeUseCaseType;
  let sessionDataUserHelper: SessionDataUserHelper;
  

   const userFixture = User.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  })

  const postFixture = Post.create({
    content: faker.lorem.sentence(),
    userId: userFixture.id,
  });

  const input = {
    postId: postFixture.id,
  }

  beforeEach(() => {
    sessionDataUserHelper = new SessionDataUserHelper();

    toggleLikeUseCase = new ToggleLikeUseCase(
      PostRepositoryMock,
      UserRepositoryMock,
      LikeRepositoryMock,
      sessionDataUserHelper
    );
    jest.spyOn(sessionDataUserHelper, 'sessionData', 'get').mockReturnValue({
      id: userFixture.id,
      email: userFixture.email,
    });
  });

  it('should create a new like', async () => {
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    LikeRepositoryMock.findByUserAndPost.mockResolvedValue(null);
    PostRepositoryMock.findById.mockResolvedValue(postFixture);

   await toggleLikeUseCase.execute(input);

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userFixture.id);
    expect(LikeRepositoryMock.findByUserAndPost).toHaveBeenCalledWith(userFixture.id, input.postId);
    expect(PostRepositoryMock.findById).toHaveBeenCalledWith(input.postId);

    expect(LikeRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        postId: input.postId,
        userId: userFixture.id,
        isActive: true,
      })
    ); 
  })
  it('should update an existing like', async () => {
    const existingLike = Like.create({
      postId: postFixture.id,
      userId: userFixture.id,
      isActive: true,
    });

    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    LikeRepositoryMock.findByUserAndPost.mockResolvedValue(existingLike);
    PostRepositoryMock.findById.mockResolvedValue(postFixture);

    await toggleLikeUseCase.execute(input);

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userFixture.id);
    expect(LikeRepositoryMock.findByUserAndPost).toHaveBeenCalledWith(userFixture.id, input.postId);

    expect(LikeRepositoryMock.update).toHaveBeenCalledWith(existingLike.id, {
      isActive: false,
    });
  })

  it('should throw NotFoundException if user is not found', async () => {
    UserRepositoryMock.findById.mockResolvedValue(null);

    await expect(toggleLikeUseCase.execute(input)).rejects.toThrow(
      new NotFoundException("User not found")
    );

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userFixture.id);
    expect(LikeRepositoryMock.findByUserAndPost).not.toHaveBeenCalled();
    expect(PostRepositoryMock.findById).not.toHaveBeenCalled();
    expect(LikeRepositoryMock.create).not.toHaveBeenCalled();
    expect(LikeRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException if post is not found', async () => {
    UserRepositoryMock.findById.mockResolvedValue(userFixture);
    LikeRepositoryMock.findByUserAndPost.mockResolvedValue(null);
    PostRepositoryMock.findById.mockResolvedValue(null);

    await expect(toggleLikeUseCase.execute(input)).rejects.toThrow(
      new NotFoundException("Post not found")
    );

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userFixture.id);
    expect(LikeRepositoryMock.findByUserAndPost).toHaveBeenCalledWith(userFixture.id, input.postId);
    expect(PostRepositoryMock.findById).toHaveBeenCalledWith(input.postId);
    expect(LikeRepositoryMock.create).not.toHaveBeenCalled();
    expect(LikeRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException if an error occurs', async () => {
    UserRepositoryMock.findById.mockRejectedValue(new Error("Database error"));

    await expect(toggleLikeUseCase.execute(input)).rejects.toThrow(
      new BadRequestException("An error occurred while creating the like")
    );

    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userFixture.id);
    expect(LikeRepositoryMock.findByUserAndPost).not.toHaveBeenCalled();
    expect(PostRepositoryMock.findById).not.toHaveBeenCalled();
    expect(LikeRepositoryMock.create).not.toHaveBeenCalled();
    expect(LikeRepositoryMock.update).not.toHaveBeenCalled();
  });
})