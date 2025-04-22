import { DeleteUserUseCaseType, UpdateUserInput } from "@domain/user/types/user-cases";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SessionDataUserHelper } from "@core/helpers";

export class DeleteUserUseCase implements DeleteUserUseCaseType {
  constructor(
    private readonly userRepository: UserRepositoryInterface,  
    private readonly sessionDataUserHelper: SessionDataUserHelper
    
  ) {}
  async execute(input: UpdateUserInput): Promise<void> {
    try {
     const user = await this.userRepository.findById(input.id);
      if (!user) {
        throw new NotFoundException({
          message: "User not found",
        });
      }
       if(user.id !== this.sessionDataUserHelper.sessionData.id) {
        throw new UnauthorizedException({
          message: "You are not authorized to update this user",
        })
      }
      

    await this.userRepository.delete(input.id);
  } catch (error) {
    if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
      throw error;
    }
    throw new BadRequestException({
      message: "Error creating user",
      error,
    });
  }
  }
}