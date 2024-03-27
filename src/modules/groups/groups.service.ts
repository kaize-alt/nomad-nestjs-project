import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../database/repositories/group.repository';
import { CrudService } from '../../helpers/crud.service';
import { GroupDocument } from '../database/models/group.model';
import { CreateGroupDto } from './dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';

@Injectable()
export class GroupsService extends CrudService<GroupDocument> {
  constructor(
    readonly groupRepository: GroupRepository,
    readonly userRepository: UserRepository,
  ) {
    super(groupRepository);
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    try {
      return await this.groupRepository.create(createGroupDto);
    } catch (error) {
      return error.message;
    }
  }

  async findGroupById(group_id: ObjectId): Promise<GroupDocument> {
    try {
      return await this.groupRepository.findById(group_id);
    } catch (error) {
      return error.message;
    }
  }

  async deleteGroupById(group_id: ObjectId): Promise<GroupDocument> {
    try {
      return await this.groupRepository.deleteOne({ _id: group_id });
    } catch (error) {
      return error.message;
    }
  }

  async addStudentToGroup(
    student_id: ObjectId,
    group_id: ObjectId,
  ): Promise<UserDocument> {
    try {
      const updatedStudent = await this.userRepository.updateOne(
        { _id: student_id },
        { group_id },
      );
      
      await this.updateStudentsCount(group_id);

      return updatedStudent;
    } catch (error) {
      return error.message;
    }
  }

  private async updateStudentsCount(group_id: ObjectId): Promise <void> {
    const group = await this.groupRepository.findById(group_id);
    if (group) {
      const studentCount = await this.userRepository.count({ group_id });
      group.studentCount = studentCount;
      await group.save();
    }
  } 
}