import {
  Controller,
  Post,
  Body,
  Put,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from '../../helpers/types/objectid.type';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Изменить данные юзера по айдишке юзера' })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() userId: ObjectId,
  ) {
    return await this.usersService.updateUserById(updateUserDto, userId);
  }

  @ApiOperation({ summary: 'Удалить данные юзера по айдишке юзера' })
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async deleteUserById(@Param() userId: ObjectId) {
    return await this.usersService.deleteUserById(userId);
  }
}