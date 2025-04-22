import { SessionDataUserHelper } from "@core/helpers";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { UpdateUserUseCase } from "@domain/user/user-cases";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplyUpdateUserUseCase extends UpdateUserUseCase {
  constructor(
    userRepository: UserRepositoryInterface,
    sessionDataUserHelper: SessionDataUserHelper
  ) {
    super(userRepository, sessionDataUserHelper);
  }
}