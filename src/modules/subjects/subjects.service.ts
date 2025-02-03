import { Injectable } from '@nestjs/common';
import { CrudService } from '../../helpers/crud.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { Types } from 'mongoose';
import { SubjectRepository } from '../database/repositories/subject.repository';
import { SubjectDocument } from '../database/models/subjects.model';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService extends CrudService<SubjectDocument> {
  constructor(readonly subjectRepository: SubjectRepository) {
    super(subjectRepository);
  }

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<SubjectDocument> {
    try {
      return await this.subjectRepository.create(createSubjectDto);
    } catch (error) {
      return error.message;
    }
  }

  async findAllSubjects(): Promise<SubjectDocument[]> {
    try {
      const query = { is_deleted: false };
      return await this.subjectRepository.find(query);
    } catch (error) {
      return error.message;
    }
  }

  async findSubjectById(id: string): Promise<SubjectDocument> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
      }
      return await this.subjectRepository.findById(id);
    } catch (error) {
      return error.message;
    }
  }

  async updateSubjectById(
    subjectDto: UpdateSubjectDto,
    subjectId: string,
  ): Promise<SubjectDocument> {
    try {
      if (!Types.ObjectId.isValid(subjectId)) {
        throw new Error('Invalid ObjectId');
      }
      return await this.subjectRepository.updateOne({ _id: subjectId }, subjectDto);
    } catch (error) {
      return error.message;
    }
  }

  async deleteSubjectById(subjectId: string): Promise<SubjectDocument> {
    try {
      if (!Types.ObjectId.isValid(subjectId)) {
        throw new Error('Invalid ObjectId');
      }
      return await this.subjectRepository.deleteOne({ _id: subjectId });
    } catch (error) {
      return error.message;
    }
  }
}
