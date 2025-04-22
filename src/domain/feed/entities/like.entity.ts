import { Entity } from "@core/domain";
import { Optional } from "@core/types/optional";
import { LikeProps } from "@domain/feed/types/entities";

export class Like extends Entity<LikeProps> {
  static create(props: Optional<LikeProps, 'createdAt' | 'updatedAt'>, id?: string): Like {
    return new Like({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get postId(): string {
    return this.props.postId;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  activate(): void {
    this.props.isActive = true;
  }
  
  deactivate(): void {
    this.props.isActive = false;
  }
}