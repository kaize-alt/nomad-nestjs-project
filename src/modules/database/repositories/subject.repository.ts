import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudRepository } from './crud.repository';
import { SubjectDocument } from '../models/subjects.model';

@Injectable()
export class SubjectRepository extends CrudRepository<SubjectDocument> {
  constructor(@InjectModel('Subjects') readonly model: Model<SubjectDocument>) {
    super(model);
  }
}