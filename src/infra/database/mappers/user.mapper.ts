import { UserEntity } from '@infra/database/entity';
import { User } from '@domain/user/entities';

export class UserMapper {
  static toDomain(data: UserEntity): User {
    return User.create(
      {
        email: data.email,
        name: data.name,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );
  }
  static toPersistence(data: User): UserEntity {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
