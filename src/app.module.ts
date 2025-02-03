import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig } from './modules/config/mongo.config';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GroupsModule } from './modules/groups/groups.module';
import { SubjectsModule } from './modules/subjects/subjects.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongoConfig,
    }),
    ConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule, 
    GroupsModule,
    SubjectsModule,
  ],
})
export class AppModule {}