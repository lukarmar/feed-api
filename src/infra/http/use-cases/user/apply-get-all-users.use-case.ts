import { UserRepositoryInterface } from "@domain/user/repositories";
import { GetAllUsersUseCase } from "@domain/user/user-cases";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplyGetAllUsersUseCase extends GetAllUsersUseCase {
  constructor(
    userRepository: UserRepositoryInterface,  
  ) {
    super(userRepository);
  }
}