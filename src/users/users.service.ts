import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: ['posts'] });
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id }, raw: true });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User[]> {
    const [_, affectedRows] = await this.userModel.update(
      updateUserDto,
      { where: { id }, returning: true },
    );
    return affectedRows;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
