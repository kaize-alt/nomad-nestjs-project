import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { CollectionName } from 'src/helpers/enums/collection-names.enum';
import { SubjectDocument } from './subjects.model';

@Schema({
  collection: CollectionName.Group,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Group {
  _id: Types.ObjectId;

  @ApiProperty({ type: 'string'})
  @Prop({ required: true })
  name: string;

  @ApiProperty({ type: 'string'})
  @Prop({ required: true })
  description: string;

  @ApiProperty({ type: 'string'})
  @Prop({ type: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Subject' }]})
  subjects: SubjectDocument[];

  @ApiProperty({ type: 'string'})
  @Prop({ default: 0 })
  studentCount: number;

  @ApiProperty({ type: 'string'})
  @Prop({ default: false })
  is_deleted: boolean;
}

export type GroupDocument = Group & mongoose.Document;

export const GroupSchema = SchemaFactory.createForClass(Group);