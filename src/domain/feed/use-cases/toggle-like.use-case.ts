import { UserRepositoryInterface } from "@domain/user/repositories";
import { PostRepositoryInterface, LikeRepositoryInterface } from "@domain/feed/repositories";
import { ToggleLikeInput, ToggleLikeUseCaseType } from "@domain/feed/types/user-cases";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Like } from "@domain/feed/entities";
import { SessionDataUserHelper } from "@core/helpers";

export class ToggleLikeUseCase implements ToggleLikeUseCaseType {
  constructor(
    private readonly postRepository: PostRepositoryInterface,  
    private readonly userRepository: UserRepositoryInterface, 
    private readonly likeRepository: LikeRepositoryInterface,
    private readonly sessionDataUserHelper: SessionDataUserHelper
  ) {}
  async execute(input: ToggleLikeInput): Promise<void> {
    try {

      const user = await this.userRepository.findById(this.sessionDataUserHelper.sessionData.id);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      const likeAlreadyExists = await this.likeRepository.findByUserAndPost(this.sessionDataUserHelper.sessionData.id, input.postId);
      if (likeAlreadyExists) {
        await this.likeRepository.update(likeAlreadyExists.id, {
          isActive: !likeAlreadyExists.isActive,
        });
        return;
      }

      const post = await this.postRepository.findById(input.postId);
      if (!post) {
        throw new NotFoundException("Post not found");
      }

      const like = Like.create({
        postId: input.postId,
        userId: this.sessionDataUserHelper.sessionData.id,
        isActive: true,
      });

      await this.likeRepository.create(like);
    
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;  
    }
    throw new BadRequestException("An error occurred while creating the like");
    }
  }
}