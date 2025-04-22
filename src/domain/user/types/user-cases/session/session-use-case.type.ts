import { UserCaseType } from "@core/types";
import { SessionInput, SessionOutput } from "@domain/user/types/user-cases";

export interface SessionUserUseCaseType extends UserCaseType<SessionInput, SessionOutput> {}