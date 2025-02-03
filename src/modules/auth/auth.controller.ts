import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @Post('signup')
  async signup(@Body() userData: CreateUserDto) {
    return await this.authService.signup(userData);
  }

  @ApiOperation({ summary: 'Логин' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userData: LoginUserDto, @Req() req): Promise<{ accessToken: string }> {
    return this.authService.login(userData, req.user);
  }

  @ApiOperation({ summary: 'Получить данные текущего пользователя' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return req.user;
  }
}
