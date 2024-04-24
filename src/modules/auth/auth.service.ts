import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../database/models/user.model';
import { LoginUserDto } from './dto';
import { comparePassword } from 'src/helpers/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(userData) {
    try {
      return await this.usersService.createUser(userData);
    } catch (error) {
      return error.message;
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | string> {
    try {
      const user = await this.usersService.findOne({ email }); 
      if (user) {
        const matched = comparePassword(password, user.password); 
        if (matched) {
          return user; 
        } else {
          return 'Password incorrect'; 
        }
      } else {
        return 'User not found'; 
      }
    } catch (error) {
      return error.message;
    }
  }
  

  login(userData: LoginUserDto, user: UserDocument) {
    if (!user) {
      return {
        message: "You are not registered",
        error: "Unauthorized",
        statusCode: 401
      };
    }
    const { email } = userData;
    const payload = { email, user_id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}