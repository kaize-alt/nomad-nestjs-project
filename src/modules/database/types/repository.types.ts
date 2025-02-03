import { FilterQuery, ProjectionType } from 'mongoose';

import { FindOptionsInterface } from '../../../helpers/interfaces/find-options.interface';

export interface Repository<Document> {
  create(data): Promise<Document>;
  find(options: FindOptionsInterface<Document>): Promise<Document[]>;
  findOne(
    query: FilterQuery<Document>,
    projection?: ProjectionType<Document>,
  ): Promise<Document>;
  updateOne(query: FilterQuery<Document>, data): Promise<Document>;
  deleteOne(query: FilterQuery<Document>): Promise<Document>;
}
