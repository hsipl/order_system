import { ICreateUserParams } from '../interafaces/user.interface';
import { User } from '../entity/user';

const field: (keyof User)[] = ['id', 'name', 'status', 'type', 'createdAt'];

export class UserRepository {
  async create(user: User) {
    return await user.save();
  }

  async getAll() {
    return await User.find({
      where: {
        status: 0,
      },
      select: field,
    });
  }
}
