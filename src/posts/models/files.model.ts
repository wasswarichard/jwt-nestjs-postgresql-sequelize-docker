import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Post } from './post.model';

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
