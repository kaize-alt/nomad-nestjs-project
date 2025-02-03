import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async createUser(createUserDto): Promise<UserDocument> {
    try {
      const password = encodePassword(createUserDto.password);
      return await this.userRepository.create({ ...createUserDto, password });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createTeacher(createUserDto): Promise<UserDocument> {
    try {
      return await this.userRepository.create({
        ...createUserDto,
        role: Roles.Teacher,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(id: ObjectId): Promise<UserDocument> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserById(userDto: UpdateUserDto, userId: ObjectId): Promise<UserDocument> {
    try {
      const updatedUser = await this.userRepository.updateOne({ _id: userId }, userDto);
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUserById(userId: ObjectId): Promise<UserDocument> {
    try {
      const deletedUser = await this.userRepository.deleteOne({ _id: userId });
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return deletedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllActiveUsers(): Promise<UserDocument[]> {
    try {
      const query = {
        is_deleted: false,
        role: Roles.Student,
      };
      return await this.userRepository.find(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
