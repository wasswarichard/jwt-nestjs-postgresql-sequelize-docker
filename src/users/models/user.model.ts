import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import { Post } from '../../posts/models/post.model';
@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  password: string;

  @Column({ unique: true })
  email: string;

  @HasMany(() => Post)
  posts: Post[];
}

// User.beforeCreate(async (user, options) => {
//   const hashedPassword = await hashPassword(user.password);
//   user.password = hashedPassword;
// });
