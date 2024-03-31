import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../models/user.model';
import { CrudService } from '../../../helpers/crud.service';
import { CrudRepository } from './crud.repository';

@Injectable()
export class UserRepository extends CrudRepository<UserDocument> {
  constructor(@InjectModel('Users') readonly model: Model<UserDocument>) {
    super(model);
  }

  async countStudentsInGroup(groupId: string): Promise<number> {
    return this.model.countDocuments({ group_id: groupId }).exec();
  }
}
