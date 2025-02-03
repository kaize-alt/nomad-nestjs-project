import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto';
import { GroupDocument } from '../database/models/group.model';
import { IdValidationPipe } from 'src/helpers/pipes/id-validation.pipe';
import { ObjectId } from 'src/helpers/types/objectid.type';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Создать группу' })
  @Post('create')
  async createGroup(@Body(new ValidationPipe()) createGroupDto: CreateGroupDto) {
    return await this.groupsService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: 'Получить весь список групп' })
  @Get('all')
  async getAllGroups(): Promise<GroupDocument[]> {
    return await this.groupsService.findAllGroups();
  }

  @ApiOperation({ summary: 'Получить группу по айди' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getGroupById(@Param('id', IdValidationPipe) id: ObjectId): Promise<GroupDocument> {
    return await this.groupsService.findGroupById(id);
  }

  @ApiOperation({ summary: 'Удалить группу по айди' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteGroupById(@Param('id', IdValidationPipe) id: ObjectId): Promise<GroupDocument> {
    return await this.groupsService.deleteGroupById(id);
  }

  @ApiOperation({ summary: 'Добавить студента в группу' })
  @Post(':user_id/:group_id')
  @ApiParam({ name: 'user_id', type: 'string', required: true })
  @ApiParam({ name: 'group_id', type: 'string', required: true })
  async addStudentToGroup(
    @Param('user_id', IdValidationPipe) user_id: ObjectId,
    @Param('group_id', IdValidationPipe) group_id: ObjectId,
  ) {
    return await this.groupsService.addStudentToGroup(user_id, group_id);
  }

  @ApiOperation({ summary: 'Изменить группу студента'})
  @Put(':user_id/:group_id')
  @ApiParam({ name: 'user_id', type: 'string', required: true })
  @ApiParam({ name: 'group_id', type: 'string', required: true })
  async changeStudentGroup(
    @Param('user_id', IdValidationPipe) user_id: ObjectId,
    @Param('group_id', IdValidationPipe) group_id: ObjectId,
  ) {
    return await this.groupsService.changeStudentGroup(user_id, group_id);
  }

  @ApiOperation({ summary: 'Добавить предмет в группу' })
  @Post(':group_id/add-subject/:subject_id')
  async addSubjectToGroup(
    @Param('group_id', IdValidationPipe) group_id: ObjectId,
    @Param('subject_id', IdValidationPipe) subject_id: ObjectId,
  ) {
    return await this.groupsService.addSubjectToGroup(subject_id, group_id);
  }
}
