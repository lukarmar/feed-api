import { UserCaseType } from "@core/types";
import { CreatePostInput } from "@domain/feed/types/user-cases";

export interface CreatePostUseCaseType extends UserCaseType<CreatePostInput, void> {}