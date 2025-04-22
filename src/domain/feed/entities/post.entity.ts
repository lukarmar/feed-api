import { Entity } from "@core/domain";
import { Optional } from "@core/types/optional";
import { PostProps } from "@domain/feed/types/entities";
import { Like } from "@domain/feed/entities";
import { User } from "@domain/user/entities";

export class Post extends Entity<PostProps> {
  static create(props: Optional<PostProps, 'createdAt' | 'updatedAt'>, id?: string): Post {
    return new Post({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id);
  }
  get userId(): string {
    return this.props.userId;
  }
  get content(): string {
    return this.props.content;
  }

  get user(): User | undefined {
    return this.props.user;
  }

  get likesCount(): number {
    return this.props.likesCount ?? 0;
  }

  get likes(): Like[] | undefined {
    return this.props.Likes;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}