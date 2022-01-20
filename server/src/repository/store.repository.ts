import { FindConditions, UpdateResult } from 'typeorm';
import { Store } from '../entity/store';

const field: (keyof Store)[] = ['id', 'name', 'status', 'type', 'image', 'createdAt'];

export class StoreRepository {
  async get(query: FindConditions<Store>): Promise<Store[]> {
    return await Store.find({
      where: query,
      select: field,
    });
  }

  async getById(id: number): Promise<Store | undefined> {
    return await Store.findOne({
      where: {
        id,
        status: 0,
      },
      select: field,
    });
  }

  async getByName(name: string): Promise<Store | undefined> {
    return await Store.findOne({
      where: {
        name,
      },
      select: field,
    });
  }

  async create(s: Store): Promise<Store> {
    return await Store.save(s);
  }

  async update(s: Store): Promise<UpdateResult | undefined> {
    return await Store.update(s.id, s);
  }

  async delete(id: number, s: Store): Promise<UpdateResult | undefined> {
    return await Store.update(id, s);
  }
}
