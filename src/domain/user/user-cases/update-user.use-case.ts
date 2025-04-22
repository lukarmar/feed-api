import { UpdateUserUseCaseType, UpdateUserInput } from "@domain/user/types/user-cases";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SessionDataUserHelper } from "@core/helpers";

export class UpdateUserUseCase implements UpdateUserUseCaseType {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly sessionDataUserHelper: SessionDataUserHelper
  ) {}
  async execute(input: UpdateUserInput): Promise<void> {
    try {
      if(!input?.email && !input?.name) {
        return;
      }
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

      Object.assign(user, {
        ...(input.email && { email: input.email }),
        ...(input.name && { name: input.name }),
      });
      await this.userRepository.update(input.id, user);

  } catch (error) {
    if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
      throw error;
    }
    throw new BadRequestException({
      message: "Error update user",
      error,
    });
  }
  }
}