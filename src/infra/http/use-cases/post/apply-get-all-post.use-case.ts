import { GetAllPostUseCase } from "@domain/feed/use-cases";
import { Injectable } from "@nestjs/common";
import { PostRepositoryInterface } from "@domain/feed/repositories";

@Injectable()
export class ApplyGetAllPostUseCase extends GetAllPostUseCase {
  constructor(
    postRepository: PostRepositoryInterface,  
  ) {
    super(postRepository);
  }
}