import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
@Table
export class Post extends Model {
  @Column
  title: string;

  @Column
  body: string;

  @Column(DataType.TEXT)
  metadata: string;

  @Column(DataType.JSONB)
  tags: Record<string, any>;

  @Column({
    type: DataType.ENUM('private', 'public'),
    defaultValue: 'public',
  })
  status: 'public' | 'private';

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @Default(null)
  @Column(DataType.DATE)
  deletedAt: Date | null;
}

// / @BelongsTo(() => User)
// // user: User;
// //
// @ForeignKey(() => User)
// @Column
// userId: number;
