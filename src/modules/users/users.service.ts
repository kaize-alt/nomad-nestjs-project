import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';
import { CrudService } from '../../helpers/crud.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from '../../helpers/types/objectid.type';

@Injectable()
export class UsersService extends CrudService<UserDocument> {
  constructor(readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(createUserDto) {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      return 'Юзер не создан';
    }
  }

  async findUser(createUserDto) {
    return await this.userRepository.findOne(createUserDto);
  }

  async updateUserById(userDto: UpdateUserDto, userId: ObjectId) {
    try {
      return await this.userRepository.updateOne({ _id: userId.id }, userDto);
    } catch (error) {
      return error.message;
    }
  }

  async deleteUserById(userId: ObjectId) {
    try {
      return await this.userRepository.deleteOne({ _id: userId.id });
    } catch (error) {
      return error.message;
    }
  }
}