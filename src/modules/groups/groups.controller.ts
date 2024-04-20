import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto';
import { GroupDocument } from '../database/models/group.model';
import { IdValidationPipe } from 'src/helpers/pipes/id-validation.pipe';
import { ObjectId } from 'src/helpers/types/objectid.type';
import { Role } from 'src/helpers/decorators/role.decorator';
import { Roles } from 'src/helpers/enums';
import { RolesGuard } from 'src/helpers/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Создать группу' })
  @Post('create')
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.createGroup(createGroupDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Получить весь список групп' })
  @Get('all')
  async getAllGroups(): Promise<GroupDocument[]> {
    return await this.groupsService.find({});
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Получить группу по айди' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getGroupById(@Param() group_id): Promise<GroupDocument> {
    return await this.groupsService.findGroupById(group_id.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Удалить группу по айди' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteGroupById(@Param() group_id): Promise<GroupDocument> {
    return await this.groupsService.deleteGroupById(group_id.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
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