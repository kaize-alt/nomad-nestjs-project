import {
  Controller,
  Post,
  Body,
  Put,
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
import { Roles } from 'src/helpers/decorators/role.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Изменить данные пользователя по id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async updateUser(
    @Param('id') userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUserById(updateUserDto, userId);
  }

  @ApiOperation({ summary: 'Удалить пользователя по id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteUserById(@Param('id') userId: ObjectId) {
    return await this.usersService.deleteUserById(userId);
  }

  @ApiOperation({ summary: 'Получить одного пользователя по айди' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getUserById(@Param('id') userId: ObjectId): Promise<UserDocument> {
    return await this.usersService.findUserById(userId);
  }

  @ApiOperation({ summary: 'Получить всех студентов' })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUsers() {
    return await this.usersService.findAllActiveUsers();
  }

  @ApiOperation({ summary: 'Добавить учителя' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('teacher')
  async registerTeacher(@Body() createTeacherDto: createTeacherDto) {
    return await this.usersService.createTeacher(createTeacherDto);
  }
}
