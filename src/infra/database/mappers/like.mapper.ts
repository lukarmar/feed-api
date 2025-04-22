import { LikeEntity } from '@infra/database/entity';
import { Like } from '@domain/feed/entities';

export class LikeMapper {
  static toDomain(data: LikeEntity): Like {
    return Like.create(
      {
        userId: data.userId,
        postId: data.postId,
        isActive: data.isActive,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      data.id,
    );
  }
  static toPersistence(data: Like): LikeEntity {
    return {
      id: data.id,
      userId: data.userId,
      postId: data.postId,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
