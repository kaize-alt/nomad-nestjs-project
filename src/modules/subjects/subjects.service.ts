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
  constructor(readonly subjectRepository: SubjectRepository,) 
    {
    super(subjectRepository);
    }

    async createSubject(createSubjectDto): Promise<SubjectDocument> {
      try {
        return await this.subjectRepository.create(CreateSubjectDto);
      } catch (error) {
        return error.message;
      }
    }
  
    async findAllSubjects() {
      try {
        const query = {
          is_deleted: false,
        };
  
        return await this.subjectRepository.find({ query });
      } catch (error) {
        return error.message;
      }
    }
  
    async findSubjectById(id: ObjectId): Promise<SubjectDocument> {
      try {
        return await this.subjectRepository.findById(id);
      } catch (error) {
        return error.message;
      }
    }
  
    async updateSubjectById(
      subjectDto: UpdateSubjectDto,
      subjectId: ObjectId,
    ): Promise<SubjectDocument> {
      try {
        return await this.subjectRepository.updateOne({ _id: subjectId.id }, subjectDto);
      } catch (error) {
        return error.message;
      }
    }
  
    async deleteSubjectById(subjectId: ObjectId): Promise<SubjectDocument> {
      try {
        return await this.subjectRepository.deleteOne({ _id: subjectId.id });
      } catch (error) {
        return error.message;
      }
    }
}