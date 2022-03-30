import { Request } from 'express';
import { FindConditions, Like } from 'typeorm';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import ErrorHandler from '../controller/error.controller';
import { User } from '../entity/user';
import { ICheckExist, ICreateUserParams, ILoginUserParams, IUpdateUserParams } from '../interafaces/user.interface';
import errorhandler from '../middlewares/errorhandler';
import { StoreRepository } from '../repository/store.repository';
import { UserRepository } from '../repository/user.repository';
import { encrypt } from '../utils/md5';
import CacheService from './cache.service';

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly StoreRepository: StoreRepository,
  ) { }

  public async create(params: ICreateUserParams, req: Request) {
    const { sessionID } = req;
    const sessionData = await this.cacheService.get(`sess:${sessionID}`);
    const { username, role, storeId } = JSON.parse(sessionData).user;
    const checkMainStoreManager = await this.repository.findMainStoreAuth({
      username,
      type: role,
      storeId,
    });
    if (!checkMainStoreManager) {
      throw new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed);
    }
    const checkforeignKeyExist = await this.StoreRepository.getById(params.storeId);
    if (!checkforeignKeyExist) {
      throw new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound);
    }
    const { u_type, s_type, s_id } = checkMainStoreManager;
    if (u_type !== 1) {
      throw new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed);
    }
    if (s_type !== 1 && storeId !== params.storeId) {
      throw new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed);
    }
    params.password = encrypt(params.password);
    let user = new User();
    user = Object.assign(user, params);
    return await this.repository.create(user);
  }
  public async update(params: IUpdateUserParams) {
    params.password = encrypt(params.password);
    let user = new User();
    user = Object.assign(user, params);
    return await this.repository.update(params.id, user);
  }
  public async login(params: ILoginUserParams) {
    params.password = encrypt(params.password);
    params.status = 0;
    const isExist = await this.repository.findOne(params);
    return isExist;
  }
  public async checkIsExitById(id: number) {
    const isExist = await this.repository.findOne({ id });
    return isExist;
  }
  public async checkIsExistByUsernameAndName(params: ICheckExist) {
    const isExist = await this.repository.findOne(params);
    return isExist;
  }

  public async getAllEmployee(req: Request) {
    const { sessionID } = req;
    const sessionData = await this.cacheService.get(`sess:${sessionID}`);
    const { role, store } = JSON.parse(sessionData).user;
    if (role !== 1) {
      throw new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed);
    }

    const employees = await this.repository.getAllEmployee({ storeId: store.id });
    return employees;
  }

  public async getAllUser(req: Request, query: FindConditions<User>) {
    const { sessionID } = req;
    const sessionData = await this.cacheService.get(`sess:${sessionID}`);
    const { role, store } = JSON.parse(sessionData).user;
    if (role !== 1) {
      throw new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed);
    }
    if (Object.keys(query).includes('name')) {
      query.name = Like('%' + query.name + '%');
    }
    const users = await this.repository.getUsers(query)
    return users
  }
}
