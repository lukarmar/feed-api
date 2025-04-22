import { SessionUserMeUseCaseType, SessionMeOutput } from "@domain/user/types/user-cases";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { SessionDataUserHelper } from "@core/helpers";

export class SessionMeUseCase implements SessionUserMeUseCaseType {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly sessionDataUserHelper: SessionDataUserHelper,
  ) {}
  async execute(): Promise<SessionMeOutput> {
    try {
      const userExists = await this.userRepository.findById(this.sessionDataUserHelper.sessionData.id)
      if (!userExists) {
        throw new NotFoundException("User not found");
      }
      return {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      }
      
  } catch (error) {
    throw new BadRequestException({
      message: error instanceof Error ? error.message : "Algo went wrong",
      error,
    });
  }
  }
}