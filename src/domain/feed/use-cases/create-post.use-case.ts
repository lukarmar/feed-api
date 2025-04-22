import { UserRepositoryInterface } from "@domain/user/repositories";
import { PostRepositoryInterface } from "@domain/feed/repositories";
import { CreatePostUseCaseType, CreatePostInput } from "@domain/feed/types/user-cases";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Post } from "@domain/feed/entities";
import { SessionDataUserHelper } from "@core/helpers";

export class CreatePostUseCase implements CreatePostUseCaseType {
  constructor(
    private readonly postRepository: PostRepositoryInterface,  
    private readonly userRepository: UserRepositoryInterface,
    private readonly sessionDataUserHelper: SessionDataUserHelper
  ) {}
  async execute(input: CreatePostInput): Promise<void> {
    try {
      const user = await this.userRepository.findById(this.sessionDataUserHelper.sessionData.id);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const post = Post.create({
        content: input.content,
        userId: this.sessionDataUserHelper.sessionData.id,
      })
      await this.postRepository.create(post);
    
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;  
    }
    throw new BadRequestException("An error occurred while creating the post");
    }
  }
}