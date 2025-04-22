import { BaseEntityPersistence } from '@core/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity, UserEntity } from '@infra/database/entity';

@Entity({ name: 'like' })
export class LikeEntity extends BaseEntityPersistence {
  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({name: "is_active", type: "boolean", default: true})
  isActive: boolean;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.likes)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post?: PostEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.likes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;
}
