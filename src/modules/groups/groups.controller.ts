import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: 'Получить весь список групп' })
  @Get('all')
  async getAllGroups(): Promise<GroupDocument[]> {
    return await this.groupsService.find({});
  }

  @ApiOperation({ summary: 'Получить группу по айди' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getGroupById(@Param() group_id): Promise<GroupDocument> {
    return await this.groupsService.findGroupById(group_id.id);
  }

  @ApiOperation({ summary: 'Удалить группу по айди' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteGroupById(@Param() group_id): Promise<GroupDocument> {
    return await this.groupsService.deleteGroupById(group_id.id);
  }

  @ApiOperation({ summary: 'Добавить студента в группу' })
  @Post(':user_id/:group_id')
  @ApiParam({ name: 'user_id', type: 'string', required: true })
  @ApiParam({ name: 'group_id', type: 'string', required: true })
  async addStudentToGroup(
    @Param('user_id', IdValidationPipe) user_id: ObjectId,
    @Param('group_id', IdValidationPipe) group_id: ObjectId,
  ) {
    const updatedStudent = await this.groupsService.addStudentToGroup(user_id, group_id);

    return updatedStudent;
  }

  @ApiOperation({ summary: 'Изменить группу студента'})
  @Put(':user_id/:group_id')
  @ApiParam({ name: 'user_id', type: 'string', required: true })
  @ApiParam({ name: 'group_id', type: 'string', required: true })
  async changeStudentGroup(
    @Param('user_id', IdValidationPipe) user_id: ObjectId,
    @Param('group_id', IdValidationPipe) group_id: ObjectId,
  ) {
    const changeStudent = await this.groupsService.changeStudentGroup(user_id, group_id);
    return changeStudent;
  }
}