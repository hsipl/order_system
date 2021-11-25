import { createConnection, getConnection, getConnectionManager } from 'typeorm';
import { User } from '../entity/user';
import { Store } from '../entity/store';
import { encrypt } from '../utils/md5';

const genData = async () => {
  const mode = process.env.MODE ? process.env.MODE : 'default';
  const defaultConnection = await createConnection(mode);
  await defaultConnection
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('name=:name', { name: 'hsipl' })
    .execute();
  await defaultConnection
    .createQueryBuilder()
    .delete()
    .from(Store)
    .where('name=:name', { name: 'kcy main store' })
    .execute();

  console.log('START CREATEING MAIN STORE...');

  const store = await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('store')
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

  await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('user')
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
  await defaultConnection.close();
};

genData();
