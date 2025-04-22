import { BaseEntityPersistence } from '@core/database';
import { Column, Entity, OneToMany } from 'typeorm';
import { LikeEntity, PostEntity } from '@infra/database/entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntityPersistence {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
  posts?: PostEntity[];

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.user)
  likes?: LikeEntity[];
}
