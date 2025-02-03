import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { MongoConfig } from './mongo.config';
import { ConfigService } from './config.service';
import { AuthConfig } from './auth.config';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [NestConfig.ConfigService, MongoConfig, ConfigService, AuthConfig],
  exports: [MongoConfig, ConfigService, AuthConfig],
})
export class ConfigModule {}
