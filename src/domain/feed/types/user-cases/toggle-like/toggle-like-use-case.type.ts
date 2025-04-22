import { UserCaseType } from "@core/types";
import { ToggleLikeInput } from "@domain/feed/types/user-cases";

export interface ToggleLikeUseCaseType extends UserCaseType<ToggleLikeInput, void> {}