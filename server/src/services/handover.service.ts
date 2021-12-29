import { UpdateResult } from "typeorm";
import { Handover } from "../entity/handover";
import { HandoverRepository } from "../repository/handover.repository";

export class HandoverService {
  constructor(private readonly repository: HandoverRepository) {}

  async getAll(): Promise<Handover[]> {
    const handover = await this.repository.getAll();
    return handover;
  }

  async getById(id: number): Promise<Handover | undefined> {
    const handover = await this.repository.getById(id);
    return handover;
  }

  async create(sysmoney: number, realcash: number,status: number): Promise<Handover> {
    const handover = new Handover();
    handover.sysmoney = sysmoney;
    handover.realcash = realcash;
    handover.status=status
    return await this.repository.create(handover);
  }

  async update(
    id: number,
    userId: number,
    sysmoney: number,
    realcash: number,
    status: number
  ): Promise<UpdateResult | undefined> {
    const handover = new Handover();
    handover.userId = userId;
    handover.sysmoney = sysmoney;
    handover.realcash = realcash;
    handover.status=status
    return await this.repository.update(id, handover);
}

  async delete(id: number): Promise<UpdateResult | undefined> {
    const handover = new Handover();
    return await this.repository.update(id, handover);

  }
}
