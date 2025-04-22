import { HashGenerator } from "@core/types";
import { CreateUserInput, CreateUserOutput, CreateUserUseCaseType } from "@domain/user/types/user-cases";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { BadRequestException, ConflictException } from "@nestjs/common";
import { User } from "@domain/user/entities";
import { CreateUserPresenter } from "@domain/user/presenters";

export class CreateUserUseCase implements CreateUserUseCaseType {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashGenerator: HashGenerator,
  ) {}
  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const userAlreadyExists = await this.userRepository.findByEmail(input.email);
      if(userAlreadyExists) {
        throw new ConflictException({
          message: "User already exists",
        });
      }

    if (input.password !== input.confirmPassword) {
      throw new ConflictException({
        message: "Passwords do not match",
      });
    }
       const hashedPassword = await this.hashGenerator.generateHash(input.password);
    const user = User.create({
      email: input.email,
      name: input.name,
      password: hashedPassword,
    })
    const newUser = await this.userRepository.create(user);
    return CreateUserPresenter.toResponse(newUser);
  } catch (error) {
    throw new BadRequestException({
      message: error instanceof Error ? error.message : "Algo went wrong",
      error,
    });
  }
  }
}