import {
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
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

  @Column({
    type: DataType.ENUM('TECHNOLOGY', 'INNOVATION', 'HEALTHCARE', 'AI'),
  })
  tags: string;

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

  @HasMany(() => Files)
  files: Files[];
}

@Table
export class Files extends Model {
  @Column
  path: string;

  @Column
  name: string;

  @ForeignKey(() => Post)
  @Column
  postId: number;
}
