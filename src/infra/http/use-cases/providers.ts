import { 
  ApplyCreateUserUseCase, 
  ApplyGetAllUsersUseCase,
  ApplySessionUseCase, 
  ApplyUpdateUserUseCase ,
  ApplyDeleteUserUseCase,
  ApplyCreatePostUseCase,
  ApplyGetAllPostUseCase,
  ApplyToggleLikePostUseCase,
  ApplySessionMeUseCase
} from "@infra/http/use-cases";

import { Provider } from "@nestjs/common";

export const UserCaseProvider: Provider[] = [
  ApplyCreateUserUseCase,
  ApplyGetAllUsersUseCase,
  ApplySessionUseCase,
  ApplyUpdateUserUseCase,
  ApplyDeleteUserUseCase,
  ApplyCreatePostUseCase,
  ApplyGetAllPostUseCase,
  ApplyToggleLikePostUseCase,
  ApplySessionMeUseCase
]