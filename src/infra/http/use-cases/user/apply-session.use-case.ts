import { Encrypter, HashComparer } from "@core/types";
import { UserRepositoryInterface } from "@domain/user/repositories";
import { SessionUseCase } from "@domain/user/user-cases";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplySessionUseCase extends SessionUseCase {
  constructor(
    userRepository: UserRepositoryInterface,  
    encrypter: Encrypter,
    hashComparer: HashComparer
  ) {
    super(userRepository, encrypter, hashComparer);
  }
}