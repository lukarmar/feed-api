import { SessionDataUserHelper } from "@core/helpers";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { DeleteUserUseCase } from "@domain/user/user-cases/delete-user.use-case";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplyDeleteUserUseCase extends DeleteUserUseCase {
  constructor(
    userRepository: UserRepositoryInterface,  
    sessionDataUserHelper: SessionDataUserHelper
    
  ) {
    super(userRepository, sessionDataUserHelper);
  }
}