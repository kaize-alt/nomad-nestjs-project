import { FilterQuery, Model, ProjectionType } from 'mongoose';

import { FindOptionsInterface } from '../../../helpers/interfaces/find-options.interface';
import { Repository } from '../types/repository.types';
import { ObjectId } from '../../../helpers/types/objectid.type';

export class CrudRepository<Document> implements Repository<Document> {
  constructor(protected model: Model<Document>) {}
  async create(data): Promise<Document> {
    return this.model.create(data);
  }

  async find(options: FindOptionsInterface<Document>): Promise<Document[]> {
    const { query, skip, limit } = options;

    return this.model.find(query).skip(skip).limit(limit);
  }

  async findOne(
    query: FilterQuery<Document>,
    projection?: ProjectionType<Document>,
  ): Promise<Document> {
    return this.model.findOne(query, projection).exec();
  }

  async findById(
    id: ObjectId,
    projection?: ProjectionType<Document>,
  ): Promise<Document> {
    return this.model.findOne({ _id: id }, projection);
  }

  async updateOne(query: FilterQuery<Document>, data): Promise<Document> {
    return this.model
      .findOneAndUpdate(
        query,
        {
          $set: data,
        },
        {
          new: true,
        },
      )
      .lean();
  }

  async deleteOne(query: FilterQuery<Document>): Promise<Document> {
    return this.updateOne(query, {
      is_deleted: true,
    });
  }

    /* Метод для добавления оценки
    addGrade(grade: Grade): void {
      this.grades.push(grade);
      this.updateTotalScore();
    }*/
  
    /* Метод для пересчета totalScore
    updateTotalScore(): void {
      let total = 0;
      this.grades.forEach(grade => {
        total += grade.value;
      });
      this.totalScore = total;
    }*/

}
