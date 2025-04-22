import { UserRepositoryInterface } from "@domain/user/repositories";
import { Injectable } from "@nestjs/common";
import { PostRepositoryInterface, LikeRepositoryInterface } from "@domain/feed/repositories";
import { ToggleLikeUseCase } from "@domain/feed/use-cases";
import { SessionDataUserHelper } from "@core/helpers";

@Injectable()
export class ApplyToggleLikePostUseCase extends ToggleLikeUseCase {
  constructor(
    postRepository: PostRepositoryInterface,  
    userRepository: UserRepositoryInterface,
    likeRepositoryInterface: LikeRepositoryInterface,
    sessionDataUserHelper: SessionDataUserHelper,
  ) {
    super(postRepository, userRepository,likeRepositoryInterface, sessionDataUserHelper);
  }
}