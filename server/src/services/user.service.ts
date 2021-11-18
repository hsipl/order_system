import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import ErrorHandler from '../controller/error.controller';
import { User } from '../entity/user';
import { ICreateUserParams, ILoginUserParams } from '../interafaces/user.interface';
import errorhandler from '../middlewares/errorhandler';
import { UserRepository } from '../repository/user.repository';
import { encrypt } from '../utils/md5';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async create(params: ICreateUserParams) {
    params.password = encrypt(params.password);
    let user = new User();
    user = Object.assign(user, params);
    return await this.repository.create(user);
  }

  public async login(params: ILoginUserParams) {
    params.password = encrypt(params.password);
    params.status = 0;
    const isExist = await this.repository.find(params);
    return isExist;
  }
}
