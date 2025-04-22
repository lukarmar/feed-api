import { UserRepositoryInterface } from "@domain/user/repositories";
import { Provider } from "@nestjs/common";
import { UserRepository, LikeRepository, PostRepository } from "@infra/database/repositories";
import { LikeRepositoryInterface, PostRepositoryInterface } from "@domain/feed/repositories";

export const ProvidersRepository: Provider[] = [
  {
    provide: UserRepositoryInterface,
    useClass: UserRepository,
  },
  {
    provide: LikeRepositoryInterface,
    useClass: LikeRepository,
  },
  {
    provide: PostRepositoryInterface,
    useClass: PostRepository,
  },
]

export const RepositoriesInterface = [
  UserRepositoryInterface,
  LikeRepositoryInterface,
  PostRepositoryInterface,
]