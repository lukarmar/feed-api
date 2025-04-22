import { Post } from '@domain/feed/entities';
import { GetAllPostOutput } from '@domain/feed/types/user-cases';

export class GetAllPostPresenter {
  static toResponse(response: Post): GetAllPostOutput {
    return {
      id: response.id,
      content: response.content,
      userId: response.userId,
      likesCount: response.likesCount,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      user: response?.user ? {
        id: response.user?.id,
        name: response.user?.name,
        email: response.user?.email,
        createdAt: response.user?.createdAt,
        updatedAt: response.user?.updatedAt
      } : undefined,
      likes: response.likes?.map((like) => ({
        id: like.id,
        userId: like.userId,
        postId: like.postId,
        isActive: like.isActive,
        createdAt: like.createdAt,
        updatedAt: like.updatedAt
      })) ?? [],
    };
  }
}
