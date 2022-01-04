import { UpdateResult } from "typeorm";
import { Handover } from "../entity/handover";

const field: (keyof Handover)[] = ["id", "userId", "sysmoney", "realcash","status", "createdAt"];

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
        id,
        status: 0,
      },
      select: field,
    });
  }

  
  async create(h: Handover): Promise<Handover> {
    return await Handover.save(h);
  }

  async update(h:Handover): Promise<UpdateResult | undefined> {
    return await Handover.update(h.id, h);
  }

  async delete(h:Handover): Promise<UpdateResult | undefined> {
    return await Handover.update(h.id, h);
  }
}
