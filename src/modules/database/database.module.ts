import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { GroupRepository } from './repositories/group.repository';
import { GroupSchema } from './models/group.model';
import { SubjectRepository } from './repositories/subject.repository';
import { SubjectSchema } from './models/subjects.model';

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
      {
        name: 'Subjects',
        schema: SubjectSchema
      }
    ]),
  ],
  providers: [UserRepository, GroupRepository, SubjectRepository],
  exports: [UserRepository, GroupRepository, SubjectRepository],
})
export class DatabaseModule {}
