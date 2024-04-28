import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../database/repositories/group.repository';
import { CrudService } from '../../helpers/crud.service';
import { GroupDocument } from '../database/models/group.model';
import { CreateGroupDto } from './dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { UserRepository } from '../database/repositories/user.repository';
import { UserDocument } from '../database/models/user.model';
import { Types } from 'mongoose';
import { SubjectRepository } from '../database/repositories/subject.repository';
import { Subject, SubjectDocument } from '../database/models/subjects.model';

@Injectable()
export class GroupsService extends CrudService<GroupDocument> {
  constructor(
    readonly groupRepository: GroupRepository,
    readonly userRepository: UserRepository,
    readonly subjectRepository: SubjectRepository
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
      const result = await this.userRepository.updateOne(
        { _id: student_id },
        { group_id: group_id },
      );

      if (result) {
        const group = await this.groupRepository.findById(group_id);
        group.studentCount += 1;
        await group.save();
      }

      return result;
    } catch (error) {
      return error.message;
    }
  }

  async changeStudentGroup(
    student_id: ObjectId,
    group_id: ObjectId,
  ): Promise<UserDocument | string> {
    try {
        const student = await this.userRepository.findById(student_id);
        if (student) {
            if (student.group_id === group_id) {
                return "Student is already in the specified group.";
            } else {
                if (student.group_id) {
                    const current_group_id = student.group_id;
                    await this.userRepository.updateOne(
                        { _id: student_id },
                        { $unset: { group_id: "" } }
                    );
                    const current_group = await this.groupRepository.findById(current_group_id);
                    if (current_group) {
                        current_group.studentCount -= 1;
                        await current_group.save();
                    }
                }
                await this.addStudentToGroup(student_id, group_id);
                return "Student group changed successfully.";
            }
        } else {
            return "Student not found.";
        }
    } catch (error) {
        return error.message;
    }
  }

  async addSubjectToGroup(subject_id: ObjectId, group_id: ObjectId): Promise<GroupDocument> {
  
    try {
    const subject = await this.subjectRepository.findById(subject_id);

    if (!subject) {
      throw new Error('Предмет не найден');
    }

    const group = await this.groupRepository.findById(group_id);

    if (!group) {
      throw new Error('Группа не найдена');
    }

    group.subjects.push(subject);

    await group.save();

    return group;
    } catch (error) {
        throw new Error(`Ошибка при добавлении предмета в группу: ${error.message}`);
      }
    }
}