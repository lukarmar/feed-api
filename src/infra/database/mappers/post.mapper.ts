import { PostEntity } from '@infra/database/entity';
import { Like, Post } from '@domain/feed/entities';
import { User } from '@domain/user/entities';

export class PostMapper {
  static toDomain(data: PostEntity): Post {
    return Post.create(
      {
        userId: data.userId,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        likesCount: data?.likesCount ?? 0,
        user: User.create({
          name: data?.user?.name ?? '',
          email: data?.user?.email ?? '',
          password: data?.user?.password ?? '',
          createdAt: data?.user?.createdAt,
          updatedAt: data?.user?.updatedAt,
        }, data?.user?.id),
        Likes: (data?.likes ?? []).map((like) => {
          return Like.create(
            {
              userId: like.userId,
              postId: like.postId,
              isActive: like.isActive,
              createdAt: like.createdAt,
              updatedAt: like.updatedAt,
            },
            like.id,
          );
        }),
      },
      data.id,
    );
  }
  static toPersistence(data: Post): PostEntity {
    return {
      id: data.id,
      userId: data.userId,
      content: data.content,
      likesCount: data.likesCount,
      user: data.user,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
