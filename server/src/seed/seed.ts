import { createConnection, getConnection, getConnectionManager } from 'typeorm';
import { User } from '../entity/user';
import { Store } from '../entity/store';
import { encrypt } from '../utils/md5';
import { Tag } from '../entity/tag';
import { Product } from '../entity/product';
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
    .from(Tag)
    .where('tag=:tag', { tag: '胡椒粉' })
    .execute();
  await defaultConnection
    .createQueryBuilder()
    .delete()
    .from(Product)
    .where('name IN (:name)', { name: ['鹽酥雞', "雞排", "薯條", "甜不辣", "四季豆", "青椒", "香菇", "地瓜"] })
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
  console.log('START CREATE TAG SUCCESS...');
  const tag = await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('tag')
    .values([
      {
        tag: '胡椒粉',
        status: 0
      }
    ]).execute();
  console.log('CREATE TAG SUCCESS...');
  console.log('START PRODUCT SUCCESS...');
  await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('product')
    .values([
      {
        name: "鹽酥雞",
        money: 50,
        category: 0,
        storeId: store.identifiers[0].id,
        status: 0
      },
      {
        name: "雞排",
        money: 60,
        category: 0,
        storeId: store.identifiers[0].id,
        status: 0
      },
      {
        name: "薯條",
        money: 30,
        category: 1,
        storeId: store.identifiers[0].id,
        status: 0
      },
      {
        name: "甜不辣",
        money: 30,
        category: 1,
        storeId: store.identifiers[0].id,
        status: 0
      },
      {
        name: "四季豆",
        money: 30,
        category: 2,
        storeId: store.identifiers[0].id,
        status: 0
      },
      {
        name: "青椒",
        money: 30,
        category: 2,
        storeId: store.identifiers[0].id,
        status: 0
      },
      {
        name: "香菇",
        money: 50,
        category: 3,
        storeId: store.identifiers[0].id,
        status: 0
      },
      {
        name: "地瓜",
        money: 30,
        category: 3,
        storeId: store.identifiers[0].id,
        status: 0
      }
    ]).execute();
  console.log('CREATE PRODUCT SUCCESS...');
  await defaultConnection.close();
};

genData();
