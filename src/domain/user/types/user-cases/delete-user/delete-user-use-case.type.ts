import { UserCaseType } from "@core/types";
import { DeleteUserInput } from "@domain/user/types/user-cases";

export interface DeleteUserUseCaseType extends UserCaseType<DeleteUserInput, void> {}