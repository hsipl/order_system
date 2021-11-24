import { Request } from 'express';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import ErrorHandler from '../controller/error.controller';
import { User } from '../entity/user';
import { ICreateUserParams, ILoginUserParams } from '../interafaces/user.interface';
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
  ) {}

  public async create(params: ICreateUserParams, req: Request) {
    const { sessionID } = req;
    const sessionData = await this.cacheService.get(`sess:${sessionID}`);
    const { username, role } = JSON.parse(sessionData).user;
    const checkAuthUser = await this.repository.findMainStoreAuth({ username, type: role });
    if (!checkAuthUser) {
      throw new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed);
    }
    const checkforeignKeyExist = await this.StoreRepository.getById(params.storeId);
    if (!checkforeignKeyExist) {
      throw new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound);
    }
    params.password = encrypt(params.password);

    let user = new User();
    user = Object.assign(user, params);
    return await this.repository.create(user);
  }

  public async login(params: ILoginUserParams) {
    params.password = encrypt(params.password);
    params.status = 0;
    const isExist = await this.repository.findOne(params);
    return isExist;
  }
}
