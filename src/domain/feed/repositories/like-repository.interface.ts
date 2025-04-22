import { Like } from "@domain/feed/entities";

export abstract class LikeRepositoryInterface {
  abstract create(like: Like): Promise<Like>;
  abstract update(id: string, like: Partial<Like>): Promise<void>;
  abstract findByUserAndPost(userId: string, postId: string): Promise<Like | null>;
}