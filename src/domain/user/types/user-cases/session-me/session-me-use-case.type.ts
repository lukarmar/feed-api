import { UserCaseType } from "@core/types";
import { SessionMeOutput } from "@domain/user/types/user-cases";

export interface SessionUserMeUseCaseType extends UserCaseType<never, SessionMeOutput> {}