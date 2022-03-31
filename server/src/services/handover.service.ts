import { UpdateResult } from "typeorm";
import { Handover } from "../entity/handover";
import { Request } from 'express';
import { HandoverRepository } from "../repository/handover.repository";
import { IHandoverCreateParams, IHandoverUpdateParams, IHandoverDeleteParams } from "../interafaces/handover.interface";
import CacheService from './cache.service';

export class HandoverService {
  constructor(
    private readonly repository: HandoverRepository,
    private readonly cacheService: CacheService,
  ) { }

  async getAll(status: number, id: number): Promise<Handover[]> {
    const handover = await this.repository.getAll(status);
    return handover;
  }
  async getByDate(date: Date): Promise<Handover[]> {
    const handover = await this.repository.getByDate(date);
    return handover;
  }

  async getById(status: number, id: number): Promise<Handover | undefined> {
    const handover = await this.repository.getById(status, id);
    return handover;
  }

  async checkExistByUserId(userid: number): Promise<boolean> {
    const isExist = await this.repository.getByUserId(userid);
    return !!isExist;
  }

  async create(req: Request, params: IHandoverCreateParams): Promise<Handover> {
    const newHandover = new Handover();
    Object.assign(newHandover, params);
    return await this.repository.create(newHandover);
  }

  async update(params: IHandoverUpdateParams): Promise<UpdateResult | undefined> {
    const handover = new Handover();
    Object.assign(handover, params);
    return await this.repository.update(handover);
  }

  async updatedelete(params: IHandoverUpdateParams): Promise<UpdateResult | undefined> {
    const handover = new Handover();
    Object.assign(handover, params);
    return await this.repository.update(handover);
  }

  async delete(params: IHandoverDeleteParams): Promise<UpdateResult | undefined> {
    const { id } = params;
    const handover = await Handover.findOne({ id });
    if (handover) {
      handover.status = 1;
      return await this.repository.update(handover);
    }

  }
}
