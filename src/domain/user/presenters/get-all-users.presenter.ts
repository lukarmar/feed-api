
import { User } from '@domain/user/entities';
import { GetAllUsersOutput } from '@domain/user/types/user-cases';

export class GetAllUsersPresenter {
  static toResponse(response: User): GetAllUsersOutput {
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }
}
