import { Connection } from 'typeorm';
import { Store } from './store';
import { User } from './user';
import { Tag } from './tag';
import { Product } from './product';

export default function getConn(c: Connection) {
  User.useConnection(c);
  Store.useConnection(c);
  Tag.useConnection(c);
<<<<<<< HEAD

=======
  Product.useConnection(c);
>>>>>>> 0f5e1c7b12f8252d26295cbaee60ca1db512883c
}
