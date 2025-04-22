import { BaseEntityProps } from "@core/domain";

export interface LikeProps extends BaseEntityProps {
  userId: string;
  postId: string;
  isActive: boolean;
}