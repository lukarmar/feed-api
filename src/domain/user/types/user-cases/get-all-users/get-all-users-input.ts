import { PaginateInput } from "@core/types";

export interface GetAllUsersInput extends PaginateInput {
  name?: string;
  email?: string;
}