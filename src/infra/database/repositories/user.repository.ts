import { UserRepositoryInterface } from '@domain/user/repositories'
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@infra/database/entity';
import { Repository } from 'typeorm';
import { PaginateResponse } from '@core/types';
import { User } from '@domain/user/entities';
import { GetAllUsersInput } from '@domain/user/types/user-cases';
import { UserMapper } from '@infra/database/mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }}).then((user) => {
      if (!user) {
        return null;
      }
      return UserMapper.toDomain(user);
    })
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }}).then((user) => {
      if (!user) {
        return null;
      }
      return UserMapper.toDomain(user);
    })
  }
  async findAll(input?: GetAllUsersInput): Promise<PaginateResponse<User>> {
    const defaultPage =  input?.page ?? 1;
    const defaultLimit = input?.limit ?? 10;

    const query = this.userRepository
    .createQueryBuilder('user')
      .orderBy(`user.${input?.sortBy ?? 'createdAt'}`, input?.sortOrder ?? 'DESC')
      .take(defaultLimit)
      .skip((defaultPage - 1) * defaultLimit)

    const conditions = {
      email: 'user.email = :email',
      name: 'LOWER(user.name) = LOWER(:name)',
    }

    const params = {
      email: input?.email,
      name: input?.name,
    }
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        query.andWhere(conditions[key as keyof typeof conditions], {
          [key]: value,
        });
      }
    }

    const [users, total] = await query.getManyAndCount();
    return {
      data: users.map((user) => {
        return UserMapper.toDomain(user);
      }),
      total,
      page: defaultPage,
      limit: defaultLimit,
      totalPages: Math.ceil(total / defaultLimit),
    }

  }
  async create(user: User): Promise<User> {
    const userEntity = UserMapper.toPersistence(user);
    return this.userRepository.save(userEntity).then((user) => {
      return UserMapper.toDomain(user);
    })
  }
  async update(id: string, user: User): Promise<void> {
    await this.userRepository.update(id, 
      UserMapper.toPersistence(user),
    );
  }
  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }


}