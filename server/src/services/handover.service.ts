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
    console.log(handover)
    return handover;
  }


  async create(user_id:number,sysmoney: number, realcash: number,status: number): Promise<Handover> {
    const handover = new Handover();
    handover.userId=user_id
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

    const handover = await Handover.findOne({ id });
    if (handover) {
      handover.status = 1;
      return await this.repository.update(handover.id,handover);
    }

  }
}
