import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { ObjectId } from 'src/helpers/types/objectid.type';

@Schema({
  collection: 'Users',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  _id: Types.ObjectId;

  @Prop()
  full_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null, type: mongoose.Types.ObjectId })
  group_id: ObjectId;

  @Prop({ default: false})
  is_deleted: boolean;

}

export class Group {
  _id: Types.ObjectId;
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);