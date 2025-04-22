import {HashComparer, Encrypter } from "@core/types";
import { SessionInput, SessionOutput, SessionUserUseCaseType } from "@domain/user/types/user-cases";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";

export class SessionUseCase implements SessionUserUseCaseType {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,

  ) {}
  async execute(input: SessionInput): Promise<SessionOutput> {
    try {
      const userExists = await this.userRepository.findByEmail(input.email);
      if (!userExists) {
        throw new UnauthorizedException("User or Password is incorrect");
      }

      const isPasswordValid = await this.hashComparer.compare(
        input.password,
        userExists.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("User or Password is incorrect");
      }

      const accessToken = await this.encrypter.encrypt({
        sub: {
         id: userExists.id,
         email: userExists.email,
        },
      })
      
      return {
        accessToken
      }
      
  } catch (error) {
    throw new BadRequestException({
      message: error instanceof Error ? error.message : "Algo went wrong",
      error,
    });
  }
  }
}