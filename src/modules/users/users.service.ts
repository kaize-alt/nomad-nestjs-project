import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';
import { CrudService } from '../../helpers/crud.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { Roles } from 'src/helpers/enums';
import { encodePassword } from 'src/helpers/utils/utils';

@Injectable()
export class UsersService extends CrudService<UserDocument> {
  constructor(readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(сreateUserDto): Promise<UserDocument> {
    try {
      const password = encodePassword(сreateUserDto.password);
      return await this.userRepository.create({ ...сreateUserDto, password }); 
    } catch (error) {
      return error.message;
    }
  }
  

  async createTeacher(createUserDto): Promise<UserDocument> {
    try {
      return await this.userRepository.create({...createUserDto, role: Roles.Teacher});
    } catch (error) {
      return error.message;
    }
  }

  async findUserById(id: ObjectId): Promise<UserDocument> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      return error.message;
    }
  }

  async updateUserById(
    userDto: UpdateUserDto,
    userId: ObjectId,
  ): Promise<UserDocument> {
    try {
      return await this.userRepository.updateOne({ _id: userId.id }, userDto);
    } catch (error) {
      return error.message;
    }
  }

  async deleteUserById(userId: ObjectId): Promise<UserDocument> {
    try {
      return await this.userRepository.deleteOne({ _id: userId.id });
    } catch (error) {
      return error.message;
    }
  }

  async findAllActiveUsers(): Promise <UserDocument[]> {
    try {
      const query = {
        is_deleted: false,
        role: Roles.Student,
      };

      return await this.userRepository.find({ query });
    } catch (error) {
      return error.message;
    }
  }
}