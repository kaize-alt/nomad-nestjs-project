import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsGuard } from './guards/groups.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGroupsDto, LoginGroupsDto } from './dto';
import { UserDocument } from '../database/models/user.model';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @Post('signup')
  async signup(@Body() userData: CreateGroupsDto): Promise<UserDocument> {
    return await this.groupsService.signup(userData);
  }

  @ApiOperation({ summary: 'Логин' })
  @UseGuards(GroupsGuard)
  @Post('login')
  async login(@Body() userData: LoginGroupsDto, @Req() req) {
    return this.groupsService.login(userData, req.user);
  }

}