import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { genSalt } from 'bcrypt';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { CollectionName } from 'src/helpers/enums/collection-names.enum';
import { Roles } from 'src/helpers/enums/roles.enum';
import { ObjectId } from 'src/helpers/types/objectid.type';

@Schema({
  collection: CollectionName.User,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  _id: Types.ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop()
  full_name: string;

  @ApiProperty({ type: 'string' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ type: 'string' })
  @Prop({ type: 'string', required: true, default: Roles.Student})
  role: Roles;

  @ApiProperty({ type: 'string' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ type: 'string' })
  @Prop({ type: mongoose.Types.ObjectId })
  group_id: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({ required: true })
  sex: string;

  @ApiProperty({ type: 'string' })
  @Prop({ required: true })
  birth_date: string;

  @ApiProperty({ type: 'string' })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ type: 'number' })
  @Prop()
  loginAttempts: number;

  @ApiProperty({ type: 'number' })
  @Prop()
  lockUntil: number;

  @ApiProperty({ type: 'boolean' })
  @Prop({ default: false})
  is_deleted: boolean;

}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);