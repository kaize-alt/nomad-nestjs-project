import { FilterQuery } from 'mongoose';


export interface FindOptionsInterface<Document> {
  query?: FilterQuery<Document>;
  skip?: number;
  limit?: number;
}
