import { Like } from "@domain/feed/entities";
import { LikeRepositoryInterface } from "@domain/feed/repositories";
import { LikeEntity } from "@infra/database/entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LikeMapper } from "../mappers/like.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LikeRepository extends LikeRepositoryInterface {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly userRepository: Repository<LikeEntity>,
  ) {
    super();
  }

  async create(like: Like): Promise<Like> {
    const likeEntity = LikeMapper.toPersistence(like);
    return this.userRepository.save(likeEntity).then((like) => {
      return LikeMapper.toDomain(like);
    })
  }
  async update(id: string, like: Partial<Like>): Promise<void> {
    await this.userRepository.update(id, like)
  }
  async findByUserAndPost(userId: string, postId: string): Promise<Like | null> {
    return this.userRepository.findOne({ where: { userId, postId } }).then((like) => {
      if (!like) {
        return null;
      }
      return LikeMapper.toDomain(like);
    })
  }
}