import { PaginateResponse } from "@core/types";
import { User } from "@domain/user/entities";
import { GetAllUsersInput } from "@domain/user/types/user-cases";

export abstract class UserRepositoryInterface {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(input?: GetAllUsersInput): Promise<PaginateResponse<User>>;
  abstract create(user: User): Promise<User>;
  abstract update(id: string, user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}