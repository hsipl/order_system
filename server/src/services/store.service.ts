import { Request } from 'express';
import { FindConditions, Like, UpdateResult } from 'typeorm';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import ErrorHandler from '../controller/error.controller';
import { Store } from '../entity/store';
import {
  IStoreCreateParams,
  IStoreDeleteParams,
  IStoreUpdateParams,
} from '../interafaces/store.interface';
import { StoreRepository } from '../repository/store.repository';
import CacheService from './cache.service';

export class StoreService {
  constructor(
    private readonly repository: StoreRepository,
    private readonly cacheService: CacheService,
  ) { }

  async get(query: FindConditions<Store>): Promise<Store[]> {
    if (Object.keys(query).includes('name')) {
      query.name = Like('%' + query.name + '%');
    }
    const store = await this.repository.get(query);
    return store;
  }

  async getById(id: number): Promise<Store | undefined> {
    const store = await this.repository.getById(id);
    return store;
  }

  async checkExistByName(name: string): Promise<boolean> {
    const isExist = await this.repository.getByName(name);
    return !!isExist;
  }

  async checkExistByID(id: number): Promise<boolean> {
    const isExist = await this.repository.getById(id);
    return !!isExist;
  }

  async create(req: Request, params: IStoreCreateParams): Promise<Store> {
    const { sessionID } = req;
    const sessionData = await this.cacheService.get(`sess:${sessionID}`);
    const { username, role, store } = JSON.parse(sessionData).user;
    if (role !== 1 || store.type !== 1) {
      throw new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed);
    }
    const newStore = new Store();
    Object.assign(newStore, params);
    return await this.repository.create(newStore);
  }

  async update(params: IStoreUpdateParams): Promise<UpdateResult | undefined> {
    const store = new Store();
    Object.assign(store, params);
    return await this.repository.update(store);
  }

  async delete(params: IStoreDeleteParams): Promise<UpdateResult | undefined> {
    const { id } = params;
    const store = await Store.findOne({ id });
    if (store) {
      store.status = 1;
      return await this.repository.update(store);
    }
  }
}
