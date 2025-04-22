import { UserCaseType, PaginateResponse } from "@core/types";
import { GetAllUsersInput, GetAllUsersOutput } from "@domain/user/types/user-cases";

export interface GetAllUsersUseCaseType extends UserCaseType<GetAllUsersInput, PaginateResponse<GetAllUsersOutput>> {}