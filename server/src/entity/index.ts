import { Connection } from 'typeorm';
import { Store } from './store';
import { User } from './user';
import { Tag } from './tag';
import { Handover } from './handover';
import { Product } from './product';
import { Order } from './order';
import { OrderProduct } from './orderProuct';

export default function getConn(c: Connection) {
  User.useConnection(c);
  Store.useConnection(c);
  Tag.useConnection(c);
  Handover.useConnection(c);
  Product.useConnection(c);
  Order.useConnection(c);
  OrderProduct.useConnection(c)
}
