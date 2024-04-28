import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { IdValidationPipe } from 'src/helpers/pipes/id-validation.pipe';
import { ObjectId } from '../../helpers/types/objectid.type';
import { SubjectDocument } from '../database/models/subjects.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateSubjectDto } from '../subjects/dto/update-subject.dto';
import { Role } from 'src/helpers/decorators/role.decorator';
import { Roles } from 'src/helpers/enums';
import { RolesGuard } from 'src/helpers/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiOperation({ summary: 'Добавление предмета' })
  @Post('createSubject')
  async addSubject(@Body() subjectData: CreateSubjectDto) {
    return await this.subjectsService.createSubject(subjectData);
  }

  @ApiOperation({ summary: 'Получить все предметы' })
  @Get('allSubjects')
  async getAllSubjects() {
    return await this.subjectsService.findAllSubjects();
  }

  @ApiOperation({ summary: 'Получить один предмет по айди' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getSubjectById(@Param() subjectId): Promise<SubjectDocument> {
    return await this.subjectsService.findSubjectById(subjectId.id);
  }

  @ApiOperation({ summary: 'Изменить данные предмета по id' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async updateSubject(
    @Body() updateUserDto: UpdateSubjectDto,
    @Param() userId: ObjectId,
  ) {
    return await this.subjectsService.updateSubjectById(updateUserDto, userId);
  }

  @ApiOperation({ summary: 'Удалить предмет по id' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteSubjectById(@Param() subjectId: ObjectId) {
    return await this.subjectsService.deleteSubjectById(subjectId);
  }
}