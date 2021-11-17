import { errorMsg } from '../bases/errorTypes';
import { User } from '../entity/user';
import { ICreateUserParams } from '../interafaces/user.interface';
import errorhandler from '../middlewares/errorhandler';
import { UserRepository } from '../repository/user.repository';
import { encrypt } from '../utils/md5';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async create(params: ICreateUserParams) {
    params.password = encrypt(params.password);
    const user = User.create(params);
    return await this.repository.create(user);
  }
}
