import { ICreateUserParams, IUserParams } from '../interafaces/user.interface';
import { User } from '../entity/user';

const field: (keyof User)[] = ['id', 'username', 'name', 'status', 'type', 'createdAt'];

export class UserRepository {
  async create(user: User) {
    return await User.save(user);
  }

  async getAll() {
    return await User.find({
      where: {
        status: 0,
      },
      select: field,
    });
  }

  async find(params: IUserParams) {
    return await User.findOne({
      where: params,
      select: field,
    });
  }
}
