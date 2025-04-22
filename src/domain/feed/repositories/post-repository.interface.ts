import { PaginateResponse } from "@core/types";
import { Post } from "@domain/feed/entities";
import { GetAllPostRepositoryInterface } from "@domain/feed/types/repository/post";

export abstract class PostRepositoryInterface {
  abstract findAll(input: GetAllPostRepositoryInterface): Promise<PaginateResponse<Post>>;
  abstract create(post: Post): Promise<Post>;
  abstract findById(id: string): Promise<Post | null>;
}