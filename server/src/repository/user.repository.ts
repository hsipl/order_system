import { ICreateUserParams, IUserGetEmployee, IUserParams } from '../interafaces/user.interface';
import { User } from '../entity/user';
import { FindConditions, UpdateResult } from 'typeorm';

const field: (keyof User)[] = ['id', 'name', 'status', 'type', 'image', 'createdAt'];
const loginField: (keyof User)[] = ['name', 'type', 'storeId'];
export class UserRepository {
  async create(user: User) {
    return await User.save(user);
  }
  async update(id: number, user: User): Promise<UpdateResult | undefined> {
    return await User.update(id, user);
  }
  async getUsers(query: FindConditions<User>): Promise<User[]> {
    return await User.find({
      select: field,
      where: query
    })
  }
  async getAllEmployee(params: IUserGetEmployee) {
    return await User.find({
      select: field,
      where: {
        storeId: params.storeId,
      },
    });
  }

  async findMainStoreAuth(params: IUserParams) {
    const query = await User.createQueryBuilder('u')
      .innerJoinAndSelect('u.storeId', 's')
      .where('s.type = :type', { type: params.type })
      .getRawOne();
    return query;
  }

  async findOne(params: IUserParams) {
    const user = await User.findOne({
      where: params,
      relations: ['storeId'],
    });
    return user;
  }
}
