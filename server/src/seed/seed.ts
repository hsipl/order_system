import { createConnection } from 'typeorm';
import { User } from '../entity/user';
import { Store } from '../entity/store';
import { encrypt } from '../utils/md5';

const genData = async () => {
  const mode = process.env.MODE as string;
  const connection = await createConnection(mode);
  await User.createQueryBuilder()
    .delete()
    .from(User)
    .where('name=:name', { name: 'hsipl' })
    .execute();
  await Store.createQueryBuilder()
    .delete()
    .from(Store)
    .where('name=:name', { name: 'kcy main store' })
    .execute();
  console.log('START CREATEING MAIN STORE...');
  const store = await Store.createQueryBuilder()
    .insert()
    .values([
      {
        name: 'kcy main store',
        type: 1,
        status: 0,
        image: '',
      },
    ])
    .execute();

  console.log('CREATE MAIN STORE SUCCESS...');
  console.log('START CREATEING SUPERUSER...');
  await User.createQueryBuilder()
    .insert()
    .values([
      {
        username: 'hsipl206',
        password: encrypt('hsipl206'),
        name: 'hsipl',
        status: 0,
        type: 1,
        image: '',
        storeId: store.identifiers[0].id,
      },
    ])
    .execute();
  console.log('CREATE SUPER USER SUCCESS...');
  await connection.close();
};

genData();
