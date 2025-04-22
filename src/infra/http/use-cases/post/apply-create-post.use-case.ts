import { UserRepositoryInterface } from "@domain/user/repositories";
import { CreatePostUseCase } from "@domain/feed/use-cases";
import { Injectable } from "@nestjs/common";
import { PostRepositoryInterface } from "@domain/feed/repositories";
import { SessionDataUserHelper } from "@core/helpers";

@Injectable()
export class ApplyCreatePostUseCase extends CreatePostUseCase {
  constructor(
    postRepository: PostRepositoryInterface,  
    userRepository: UserRepositoryInterface,
    sessionDataUserHelper: SessionDataUserHelper
  ) {
    super(postRepository, userRepository,sessionDataUserHelper);
  }
}