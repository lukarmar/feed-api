import { PaginateResponse } from "@core/types";
import { User } from "@domain/user/entities";
import { faker } from "@faker-js/faker/.";

export const GetAllUsersFixture: PaginateResponse<User> = {
  data: [User.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  })],
  limit: 10,
  page: 1,
  total: 2,
  totalPages: 1,
}