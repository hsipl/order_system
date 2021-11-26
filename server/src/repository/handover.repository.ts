import { UpdateResult } from "typeorm";
import { Handover } from "../entity/handover";

const field: (keyof Handover)[] = ["id", "userId", "sysmoney", "realcash", "createdAt"];

export class HandoverRepository {
  async getAll(): Promise<Handover[]> {
    return await Handover.find({
      where: {
        status: 0,
      },
      select: field,
    });
  }

  async getById(id: number): Promise<Handover | undefined> {
    return await Handover.findOne({
      where: {
        id: id,
        status: 0,
      },
      select: field,
    });
  }

  
  async create(s: Handover): Promise<Handover> {
    return await Handover.save(s);
  }

  async update(id: number, s: Handover): Promise<UpdateResult | undefined> {
    return await Handover.update(id, s);
  }

  async delete(id: number, s: Handover): Promise<UpdateResult | undefined> {
    return await Handover.update(id, s);
  }
}
