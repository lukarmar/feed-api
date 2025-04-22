import { Entity } from "@core/domain";
import type { Optional } from "@core/types/optional";
import { UserProps } from "@domain/user/types";

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt' | 'updatedAt'>, id?: string): User {
    return new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, id);
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }
  get password(): string {
    return this.props.password;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set name(name: string) {
    this.props.name = name;
  }
  set email(email: string) {
    this.props.email = email;
  }
}
