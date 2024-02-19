import {Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() userData ) {
        return await this.authService.signup(userData);
    }
  }
  