import { UpdateResult } from "typeorm";
import { Handover } from "../entity/handover";

const field: (keyof Handover)[] = ["id", "userId", "sysmoney", "realcash","status", "createdAt"];

export class HandoverRepository {

  async getAll(status:number): Promise<Handover[]> {
    if(status){
    return await Handover.find({
      relations: ['userId'],
      where: {
        status:status,
      },
      select: field,
    });}

    else{    
      return await Handover.find({
      relations: ['userId'],
      where: {
        status:0,
      },
      select: field,
    });}
  }

  async getById(status:number,handoverid: number): Promise<Handover | undefined> {
    if(status){
      return await Handover.findOne({
        relations: ['userId'],
        where: {
          id:handoverid,
          status: status,
        },
        select: field,
      });
  }
    else{
      return await Handover.findOne({
        relations: ['userId'],
        where: {
          id:handoverid,
          status: 0,
        },
        select: field,
      });
    }
  }

  async getByUserId(userId: number): Promise<Handover | undefined> {
    return await Handover.findOne({
      where: {
        userId,
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