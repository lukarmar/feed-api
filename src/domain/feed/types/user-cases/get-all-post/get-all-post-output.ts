export interface GetUserOutput {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetLikesOutput {
  id: string;
  userId: string;
  postId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllPostOutput {
  id: string;
  content: string;
  userId: string;
  likesCount?: number;
  likes?: GetLikesOutput[]
  user?: GetUserOutput;
  createdAt: Date;
  updatedAt: Date;
}