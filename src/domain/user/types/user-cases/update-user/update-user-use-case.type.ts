import { UserCaseType } from "@core/types";
import { UpdateUserInput } from "@domain/user/types/user-cases";

export interface UpdateUserUseCaseType extends UserCaseType<UpdateUserInput, void> {}