import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { IdValidationPipe } from 'src/helpers/pipes/id-validation.pipe';
import { ObjectId } from '../../helpers/types/objectid.type';
import { SubjectDocument } from '../database/models/subjects.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  
}