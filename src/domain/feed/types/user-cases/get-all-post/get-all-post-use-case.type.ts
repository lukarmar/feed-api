import { UserCaseType, PaginateResponse } from "@core/types";
import { GetAllPostInput, GetAllPostOutput } from "@domain/feed/types/user-cases";

export interface GetAllPostUseCaseType extends UserCaseType<GetAllPostInput, PaginateResponse<GetAllPostOutput>> {}