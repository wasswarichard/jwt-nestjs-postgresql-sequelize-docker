import { Column, DataType, Model, Table } from 'sequelize-typescript';
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
}
