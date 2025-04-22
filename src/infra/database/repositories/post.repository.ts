import { Post } from "@domain/feed/entities";
import { PostRepositoryInterface } from "@domain/feed/repositories";
import { PostEntity } from "@infra/database/entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginateResponse } from "@core/types";
import { PostMapper } from "@infra/database/mappers";
import { Injectable } from "@nestjs/common";
import { GetAllPostRepositoryInterface } from "@domain/feed/types/repository/post";

@Injectable()
export class PostRepository extends PostRepositoryInterface {
  constructor(
    @InjectRepository(PostEntity)
    private readonly userRepository: Repository<PostEntity>,
  ) {
    super();
  }

async findAll(input?: GetAllPostRepositoryInterface): Promise<PaginateResponse<Post>> {
    const defaultPage =  input?.page ?? 1;
    const defaultLimit = input?.limit ?? 10;
    const query = this.userRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.likes', 'likes')
      .loadRelationCountAndMap('post.likesCount', 'post.likes', 
        'likesCount', (qb) => qb.andWhere('likesCount.isActive = :isActive', { isActive: true })
      )
      .orderBy(`post.${input?.sortBy ?? `createdAt`}`, input?.sortOrder ?? 'DESC')
      .take(defaultLimit)
      .skip((defaultPage - 1) * defaultLimit)

    if (input?.userId) {
      query.andWhere('post.userId = :userId', { userId: input.userId });
    }

    const [posts, total] = await query.getManyAndCount();
    return {
      data: posts.map(PostMapper.toDomain),
      total,
      page: defaultPage,
      limit: defaultLimit,
      totalPages: Math.ceil(total / defaultLimit),
    }

  }
  async create(post: Post): Promise<Post> {
    const postEntity = PostMapper.toPersistence(post);
    return this.userRepository.save(postEntity).then((post) => {
      return PostMapper.toDomain(post);
    })
  }
  async findById(id: string): Promise<Post | null> {
    return this.userRepository.findOne({ where: { id }}).then((post) => {
      if (!post) {
        return null;
      }
      return PostMapper.toDomain(post);
    })
  }
 
  
}