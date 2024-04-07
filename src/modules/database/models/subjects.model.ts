import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { ObjectId } from '../../../helpers/types/objectid.type';

@Schema({
  collection: 'Subjects',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Subject {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  classroom: string;

  @Prop({ default: false })
  is_deleted: boolean;
}

export type SubjectDocument = Subject & mongoose.Document;

export const SubjectSchema = SchemaFactory.createForClass(Subject);