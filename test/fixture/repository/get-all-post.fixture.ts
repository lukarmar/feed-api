import { PaginateResponse } from "@core/types";
import { Like, Post } from "@domain/feed/entities";

import { faker } from "@faker-js/faker/.";

export const GetAllPostFixture: PaginateResponse<Post> = {
  data: [Post.create({
    content: faker.lorem.paragraph(),
    userId: faker.string.uuid(),
    likesCount: 1,
    Likes: [Like.create({
      userId: faker.string.uuid(),
      postId: faker.string.uuid(),
      isActive: true,
    })],
  })],
  limit: 10,
  page: 1,
  total: 2,
  totalPages: 1,
}