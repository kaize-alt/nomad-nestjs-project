import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

import { ConfigService } from './config.service';

@Injectable()
export class AuthConfig implements JwtOptionsFactory {
  readonly secret: string;
  readonly expiresIn: number | string;

  constructor(configService: ConfigService) {
    this.secret = configService.getString('JWT_SECRET');
    this.expiresIn = configService.getString('JWT_EXP');
  }

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.secret,
      signOptions: {
        expiresIn: this.expiresIn,
      },
    };
  }
}
