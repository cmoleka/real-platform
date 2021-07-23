import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => user);
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return user;
  }

  async updateUser(userId: string, updateData) {
    const updatedUser = await this.userModel.updateOne(
      { _id: userId },
      updateData,
      { new: true, upsert: true, rawResult: true },
    );
    return updatedUser;
  }

  async deleteUser(userId: string) {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) throw new NotFoundException('Could not find user.');
    return user;
  }
}
