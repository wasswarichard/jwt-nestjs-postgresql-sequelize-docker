import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class Post extends Model {
  @Column
  title: string;

  @Column
  body: string;
}
