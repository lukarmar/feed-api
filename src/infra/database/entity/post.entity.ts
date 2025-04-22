import { BaseEntityPersistence } from '@core/database';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LikeEntity, UserEntity } from '@infra/database/entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntityPersistence {
  @Column({ name: 'content', type: 'varchar' })
  content: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @OneToMany(() => LikeEntity, (like:LikeEntity) => like.post)
  likes?: LikeEntity[];

  likesCount?: number;
}
