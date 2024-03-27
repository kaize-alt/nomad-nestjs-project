import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { GroupRepository } from './repositories/group.repository';
import { GroupSchema } from './models/group.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
      },
      {
        name: 'Groups',
        schema: GroupSchema,
      },
    ]),
  ],
  providers: [UserRepository, GroupRepository],
  exports: [UserRepository, GroupRepository],
})
export class DatabaseModule {}
