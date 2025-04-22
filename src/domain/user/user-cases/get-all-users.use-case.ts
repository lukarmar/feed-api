import { PaginateResponse } from "@core/types";
import { GetAllUsersInput, GetAllUsersOutput, GetAllUsersUseCaseType } from "@domain/user/types/user-cases";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { BadRequestException } from "@nestjs/common";
import { GetAllUsersPresenter } from "../presenters";

export class GetAllUsersUseCase implements GetAllUsersUseCaseType {
  constructor(
    private readonly userRepository: UserRepositoryInterface,  
  ) {}
  async execute(input: GetAllUsersInput): Promise<PaginateResponse<GetAllUsersOutput>> {
    try {
      const users = await this.userRepository.findAll(input);
      return {
        data: users.data.map(GetAllUsersPresenter.toResponse),
        total: users.total,
        page: users.page,
        limit: users.limit,
        totalPages: users.totalPages
      };
   } catch (error) {
    throw new BadRequestException({
      message: 'Error fetching users',
      error
    });
  }
  }
}
  
