import { UserCaseType } from "@core/types";
import { CreateUserInput, CreateUserOutput } from "@domain/user/types/user-cases";

export interface CreateUserUseCaseType extends UserCaseType<CreateUserInput, CreateUserOutput> {}