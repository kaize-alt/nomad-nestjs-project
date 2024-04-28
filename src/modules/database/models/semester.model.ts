import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ObjectId } from 'src/helpers/types/objectid.type';
import { SubjectDocument } from './subjects.model';

@Schema()
export class Semester {
  @ApiProperty({ type: 'number' })
  @Prop({ required: true })
  semesterNumber: number;

  @ApiProperty({ type: 'Date' })
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty({ type: 'Date' })
  @Prop({ required: true })
  endDate: Date;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }] })
  subjects: SubjectDocument[];
}

export type SemesterDocument = Semester & mongoose.Document;

export const SemesterSchema = SchemaFactory.createForClass(Semester);
