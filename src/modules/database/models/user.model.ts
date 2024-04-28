import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { genSalt } from 'bcrypt';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { CollectionName } from 'src/helpers/enums/collection-names.enum';
import { Roles } from 'src/helpers/enums/roles.enum';
import { ObjectId } from 'src/helpers/types/objectid.type';
import { SubjectDocument } from './subjects.model';


interface Grade {
  value: number;
  date: Date;
  comment?: string;
}

interface SubjectGrade {
  subjectId: ObjectId;
  score: number;
  totalScore: number;
  grades: Grade[];
}

interface SemesterGrade {
  semester: number;
  grades: Grade[];
}


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
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }] })
  subjects: SubjectDocument[];

  @ApiProperty({ type: 'object' })
  @Prop({ type: Object }) 
  subjectGrades: Record<string, SubjectGrade>; 


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
  @Prop({ default: 0 })
  loginAttempts: number;

  @ApiProperty({ type: 'Date' })
  @Prop({ default: null })
  lockUntil: Date | null;

  @ApiProperty({ type: 'boolean' })
  @Prop({ default: false})
  is_deleted: boolean;

}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);