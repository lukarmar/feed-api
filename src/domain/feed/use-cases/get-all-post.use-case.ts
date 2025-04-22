import { PaginateResponse } from "@core/types";
import { BadRequestException } from "@nestjs/common";
import { GetAllPostUseCaseType } from "@domain/feed/types/user-cases";
import { GetAllPostOutput, GetAllPostInput } from "@domain/feed/types/user-cases";
import { PostRepositoryInterface } from "@domain/feed/repositories";
import { GetAllPostPresenter } from "@domain/feed/presenters";


export class GetAllPostUseCase implements GetAllPostUseCaseType {
  constructor(
    private readonly postRepository: PostRepositoryInterface,
  ) {}
  async execute(input: GetAllPostInput): Promise<PaginateResponse<GetAllPostOutput>> {
    try {
      const posts = await this.postRepository.findAll(input);
      return {
        data: posts.data.map(GetAllPostPresenter.toResponse),
        total: posts.total,
        page: posts.page,
        limit: posts.limit,
        totalPages: posts.totalPages
      };
   } catch (error) {
    throw new BadRequestException({
      message: 'Error fetching posts',
      error
    });
  }
  }
}
  
