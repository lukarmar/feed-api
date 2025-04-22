import { User } from "@domain/user/entities";
import { CreateUserOutput } from "@domain/user/types/user-cases";

export class CreateUserPresenter {
  static toResponse(user: User): CreateUserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}