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
    ) {}

  async getAll(): Promise<Handover[]> {
    const handover = await this.repository.getAll();
    return handover;
  }

  async getById(id: number): Promise<Handover | undefined> {

    const handover = await this.repository.getById(id);
    return handover;
  }


  async create(req: Request,params:IHandoverCreateParams): Promise<Handover> {
    const { sessionID } = req;
    const sessionData = await this.cacheService.get(`sess:${sessionID}`);
    const { user_id, sysmoney, realcash,status } = JSON.parse(sessionData).user;

    const newHandover = new Handover();
    Object.assign(newHandover, params);
    return await this.repository.create(newHandover);
  }

  async update( params:IHandoverUpdateParams ): Promise<UpdateResult | undefined> {
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
