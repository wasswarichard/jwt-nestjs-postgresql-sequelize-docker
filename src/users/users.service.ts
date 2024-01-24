import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...createUserDto });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    const [affectedCount, affectedRows] = await this.userModel.update(
      updateUserDto,
      { where: { id }, returning: true },
    );
    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
