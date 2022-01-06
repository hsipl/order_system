import { createConnection, getConnection, getConnectionManager } from 'typeorm';
import { User } from '../entity/user';
import { Store } from '../entity/store';
import { encrypt } from '../utils/md5';
import { Tag } from '../entity/tag';
import { Product } from '../entity/product';
import { Handover } from '../entity/handover';

const genData = async () => {
  const tagJson = [
    {
      "tag": "小辣",
      "status": 0
    },
    {
      "tag": "中辣",
      "status": 0
    },
    {
      "tag": "大辣",
      "status": 0
    },
    {
      "tag": "梅粉",
      "status": 0
    },
    {
      "tag": "海苔粉",
      "status": 0
    },
    {
      "tag": "胡椒",
      "status": 0
    },
    {
      "tag": "不加胡椒",
      "status": 0
    },
    {
      "tag": "七味粉",
      "status": 0
    }
  ];
  const productJson = [
    {
      "name": "鹽酥雞",
      "price": 50,
      "category": 0,
      "status": 0
    },
    {
      "name": "雞排",
      "price": 60,
      "category": 0,
      "status": 0
    },
    {
      "name": "薯條",
      "price": 30,
      "category": 1,
      "status": 0
    },
    {
      "name": "甜不辣",
      "price": 30,
      "category": 1,
      "status": 0
    },
    {
      "name": "米血",
      "price": 30,
      "category": 1,
      "status": 0
    },
    {
      "name": "百頁豆腐",
      "price": 30,
      "category": 1,
      "status": 0
    },
    {
      "name": "章魚足",
      "price": 50,
      "category": 3,
      "status": 0
    },
    {
      "name": "魷魚絲",
      "price": 50,
      "category": 3,
      "status": 0
    },
    {
      "name": "四季豆",
      "price": 30,
      "category": 2,
      "status": 0
    },
    {
      "name": "青椒",
      "price": 30,
      "category": 2,
      "status": 0
    }
  ];
  const mode = process.env.MODE ? process.env.MODE : 'default';
  const productDeleteName = productJson.map(p => p.name);
  const tagDelete = tagJson.map(t => t.tag);
  const defaultConnection = await createConnection(mode);
  await defaultConnection
    .createQueryBuilder()
    .delete()
    .from(Handover)
    .where('sysmoney=:sysmoney', { sysmoney: 30 })
    .execute();

  await defaultConnection
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('name=:name', { name: 'hsipl' })
    .execute();
  try {
    await defaultConnection.query("TRUNCATE TABLE product_tag");
  } catch (e) { console.log(e) }
  await defaultConnection
    .createQueryBuilder()
    .delete()
    .from(Tag)
    .where('tag IN (:tag)', { tag: tagDelete })
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

  const users = await defaultConnection
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
  const tagData = tagJson;

  const tag = await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('tag')
    .values(tagData).execute();
  const tagId = [tag.identifiers[0].id, tag.identifiers[1].id]
  console.log('CREATE TAG SUCCESS...');
  console.log('START PRODUCT TAG SUCCESS...');
  const productData: Product[] = []
  productJson.forEach(p => {
    let product = new Product();
    Object.assign(product, p);
    product.storeId = store.identifiers[0].id;
    productData.push(product);
  })

  const product = await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('product')
    .values(productData)
    .execute();
  console.log('CREATE PRODUCT SUCCESS...');
  let productIds = product.identifiers.map(a => a.id);
  let values = '';
  for (let i = 0; i < productIds.length; i++) {
    values += "(\'" + productIds[i] + "\',\'" + tagId[0] + "\'),"
  }
  values += "(\'" + productIds[0] + "\',\'" + tagId[1] + "\'),"
  const quertString = "INSERT INTO product_tag (prodcut_id,tag_id) VALUES " + values.slice(0, -1);
  await defaultConnection.query(quertString)

  console.log('START CREATE HANDOVER SUCCESS...');

  await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('handover')
    .values([
      {
        userId: users.identifiers[0].id,
        sysmoney: 30,
        realcash: 30,
        status: 0
      }
    ]).execute();
  console.log('CREATE HANDOVER SUCCESS...');
  await defaultConnection.close();
};

genData();
