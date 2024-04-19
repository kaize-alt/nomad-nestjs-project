import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { CollectionName } from 'src/helpers/enums/collection-names.enum';

@Schema({
  collection: CollectionName.Group,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Group {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  studentCount: number;

  @Prop({ default: false })
  is_deleted: boolean;
}

export type GroupDocument = Group & mongoose.Document;

export const GroupSchema = SchemaFactory.createForClass(Group);