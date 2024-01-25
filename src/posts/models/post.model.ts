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

  @Column
  metadata: string;

  @Column({
    type: DataType.ENUM('private', 'public'),
    defaultValue: 'public',
  })
  tag: 'public' | 'private';

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
