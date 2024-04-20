import {
  Controller,
  Post,
  Body,
  Put,
  Query,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from '../../helpers/types/objectid.type';
import { UserDocument } from '../database/models/user.model';
import { createTeacherDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/helpers/guards/roles.guard';
import { ROLES_KEY, Role } from 'src/helpers/decorators/role.decorator';
import { Admin } from 'typeorm';
import { Roles } from 'src/helpers/enums';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Изменить данные пользователя по id' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() userId: ObjectId,
  ) {
    return await this.usersService.updateUserById(updateUserDto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Удалить пользователя по id' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteUserById(@Param() userId: ObjectId) {
    return await this.usersService.deleteUserById(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Получить одного пользователя по айди' })
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getUserById(@Param() userId): Promise<UserDocument> {
    return await this.usersService.findUserById(userId.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Получить всех студентов' })
  @Get('all')
  async getAllUsers() {
    return await this.usersService.findAllActiveUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.Admin)
  @ApiOperation({ summary: 'Добавить учителя' })
  @Post('teacher')
  async registerTeacher(@Param() createTeacherDto: createTeacherDto) {
    return await this.usersService.createTeacher(createTeacherDto);
  }
}