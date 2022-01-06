import { createConnection, getConnection, getConnectionManager } from 'typeorm';
import { User } from '../entity/user';
import { Store } from '../entity/store';
import { encrypt } from '../utils/md5';
import { Tag } from '../entity/tag';
import { Product } from '../entity/product';
import { Handover } from '../entity/handover';
const genData = async () => {
  const mode = process.env.MODE ? process.env.MODE : 'default';
  const productDeleteName = [];
  for (let i = 0; i < 32; i++) {
    productDeleteName.push("測資" + i.toString())
  }
  const tagDelete = [];
  for (let i = 0; i < 13; i++) {
    tagDelete.push("測資" + i.toString())
  }
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
  const tagData = [];
  for (let i = 0; i < 13; i++) {
    let data = new Tag();
    data.tag = "測資" + i.toString();
    data.status = 0;
    tagData.push(data);
  }
  const tag = await defaultConnection
    .createQueryBuilder()
    .insert()
    .into('tag')
    .values(tagData).execute();
  const tagId = [tag.identifiers[0].id, tag.identifiers[1].id]
  console.log('CREATE TAG SUCCESS...');
  console.log('START PRODUCT TAG SUCCESS...');
  const productData = []
  for (let i = 0; i < 32; i++) {
    let product = new Product();
    product.name = "測資" + i.toString();
    product.price = 50;
    product.category = i % 4;
    product.storeId = store.identifiers[0].id;
    product.status = 0
    productData.push(product);
  }
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
