import { SessionDataUserHelper } from "@core/helpers";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { SessionMeUseCase } from "@domain/user/user-cases";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplySessionMeUseCase extends SessionMeUseCase {
  constructor(
    userRepository: UserRepositoryInterface,  
    sessionDataUserHelper: SessionDataUserHelper,
  ) {
    super(userRepository, sessionDataUserHelper);
  }
}