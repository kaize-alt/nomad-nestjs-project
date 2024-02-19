import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

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
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);
