import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from '../config/auth.config';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useExisting: AuthConfig,
    }),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, UsersService],
})
export class GroupsModule {}