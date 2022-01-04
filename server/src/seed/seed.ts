import { createConnection, getConnection, getConnectionManager } from 'typeorm';
import { User } from '../entity/user';
import { Store } from '../entity/store';
import { encrypt } from '../utils/md5';
import { Tag } from '../entity/tag';
import { Product } from '../entity/product';
const genData = async () => {
  const mode = process.env.MODE ? process.env.MODE : 'default';
  const productDeleteName = ['鹽酥雞', "雞排", "薯條", "甜不辣", "四季豆", "青椒", "香菇", "地瓜"];
  for (let i = 0; i < 24; i++) {
    productDeleteName.push("測資" + i.toString())
  }
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
    .where('name IN (:name)', { name: productDeleteName })
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
  const productData = [
    {
      name: "鹽酥雞",
      price: 50,
      category: 0,
      storeId: store.identifiers[0].id,
      status: 0
    },
    {
      name: "雞排",
      price: 60,
      category: 0,
      storeId: store.identifiers[0].id,
      status: 0
    },
    {
      name: "薯條",
      price: 30,
      category: 1,
      storeId: store.identifiers[0].id,
      status: 0
    },
    {
      name: "甜不辣",
      price: 30,
      category: 1,
      storeId: store.identifiers[0].id,
      status: 0
    },
    {
      name: "四季豆",
      price: 30,
      category: 2,
      storeId: store.identifiers[0].id,
      status: 0
    },
    {
      name: "青椒",
      price: 30,
      category: 2,
      storeId: store.identifiers[0].id,
      status: 0
    },
    {
      name: "香菇",
      price: 50,
      category: 3,
      storeId: store.identifiers[0].id,
      status: 0
    },
    {
      name: "地瓜",
      price: 30,
      category: 3,
      storeId: store.identifiers[0].id,
      status: 0
    }
  ];
  for (let i = 0; i < 24; i++) {
    productData.push({
      name: "測資" + i.toString(),
      price: 50,
      category: i % 4,
      storeId: store.identifiers[0].id,
      status: 0
    })
  }
  await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('product')
    .values(productData)
    .execute();
  console.log('CREATE PRODUCT SUCCESS...');
  await defaultConnection.close();
};

genData();
