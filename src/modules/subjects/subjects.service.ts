import { Injectable } from '@nestjs/common';
import { CrudService } from '../../helpers/crud.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { Types } from 'mongoose';
import { SubjectRepository } from '../database/repositories/subject.repository';
import { SubjectDocument } from '../database/models/subjects.model';


@Injectable()
export class SubjectsService extends CrudService<SubjectDocument> {
  constructor(readonly subjectRepository: SubjectRepository,) 
    {
    super(subjectRepository);
    }


}