import { Column, Table, Model } from 'sequelize-typescript';
@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

}
