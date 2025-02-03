import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { ConfigService } from './config.service';

@Injectable()
export class MongoConfig implements MongooseOptionsFactory {
  private readonly connection_string: string;
  private readonly db_name: string;

  constructor(configService: ConfigService) {
    this.connection_string = configService.getString('CONNECTION_STRING');
    this.db_name = configService.getString('DB_NAME');
  }

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb+srv://${this.connection_string}`,
      dbName: this.db_name,
    };
  }
}
