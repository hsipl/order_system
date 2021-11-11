import { UpdateResult } from "typeorm";
import { Store } from "../entity/store";

const field: (keyof Store)[] = ["id", "name", "status", "type", "createdAt"];

export class StoreRepository {
  async getAll(): Promise<Store[]> {
    return await Store.find({
      where: {
        status: 0,
      },
      select: field,
    });
  }

  async getById(id: number): Promise<Store | undefined> {
    return await Store.findOne({
      where: {
        id: id,
        status: 0,
      },
      select: field,
    });
  }

  async getByName(name: string): Promise<Store | undefined> {
    return await Store.findOne({
      where: {
        name: name,
      },
      select: field,
    });
  }

  async create(s: Store): Promise<Store> {
    return await Store.save(s);
  }

  async update(id: number, s: Store): Promise<UpdateResult | undefined> {
    return await Store.update(id, s);
  }

  async delete(id: number, s: Store): Promise<UpdateResult | undefined> {
    return await Store.update(id, s);
  }
}
