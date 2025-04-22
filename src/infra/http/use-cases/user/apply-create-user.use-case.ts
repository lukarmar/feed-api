import { HashGenerator } from "@core/types";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { CreateUserUseCase } from "@domain/user/user-cases";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplyCreateUserUseCase extends CreateUserUseCase {
  constructor(
    userRepository: UserRepositoryInterface,  
    hashGenerator: HashGenerator,
  ) {
    super(userRepository, hashGenerator);
  }
}