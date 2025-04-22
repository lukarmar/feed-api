import { BaseEntityProps } from "@core/domain";
import { Like } from "@domain/feed/entities";
import type { User } from "@domain/user/entities";

export interface PostProps extends BaseEntityProps {
  userId: string;
  content: string;
  likesCount?: number;
  user?: User;
  Likes?: Like[];
}