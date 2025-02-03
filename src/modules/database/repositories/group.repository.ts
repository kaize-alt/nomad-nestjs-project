import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudRepository } from './crud.repository';
import { GroupDocument } from '../models/group.model';

@Injectable()
export class GroupRepository extends CrudRepository<GroupDocument> {
  constructor(@InjectModel('Groups') readonly model: Model<GroupDocument>) {
    super(model);
  }
}
