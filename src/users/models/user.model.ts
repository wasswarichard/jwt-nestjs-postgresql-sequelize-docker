import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import { Post } from '../../posts/models/post.model';
import * as bcrypt from 'bcrypt';
@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  password: string;

  @Column({ unique: true })
  username: string;

  @HasMany(() => Post)
  posts: Post[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// User.beforeCreate(async (user, options) => {
//   const hashedPassword = await hashPassword(user.password);
//   user.password = hashedPassword;
// });
