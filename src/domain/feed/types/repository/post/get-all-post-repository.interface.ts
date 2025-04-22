import { PaginateInput } from "@core/types";

export interface GetAllPostRepositoryInterface extends PaginateInput {
  userId?: string;
}