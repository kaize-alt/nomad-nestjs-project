import { NotFoundException } from '@nestjs/common';
import { FilterQuery, ProjectionType } from 'mongoose';

import { Repository } from '../modules/database/types/repository.types';
import { FindOptionsInterface } from './interfaces/find-options.interface';
import { ObjectId } from './types/objectid.type';

export class CrudService<Document> {
  constructor(protected repository: Repository<Document>) {}
  async create(data) {
    return this.repository.create(data);
  }

  async find(options: FindOptionsInterface<Document>) {
    return this.repository.find(options);
  }

  async findOne(
    query: FilterQuery<Document>,
    projection?: ProjectionType<Document>,
  ) {
    const instance = await this.repository.findOne(query, projection);

    if (!instance) {
      throw new NotFoundException(`Model not found`);
    }

    return instance;
  }

  async findById(id: ObjectId, projection?: ProjectionType<Document>) {
    return await this.repository.findOne({ _id: id }, projection);
  }
  //TODO: fix type
  async updateOne(query: FilterQuery<Document>, data: Partial<Document> | any) {
    const instance = await this.findOne(query);

    if (!Object.keys(data).length) {
      return instance;
    }

    return await this.repository.updateOne(query, data);
  }

  async deleteOne(query: FilterQuery<Document>) {
    return await this.updateOne(query, {
      is_deleted: true,
    });
  }
}
