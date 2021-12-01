import { Connection } from 'typeorm';
import { Store } from './store';
import { User } from './user';

export default function getConn(c: Connection) {
  User.useConnection(c);
  Store.useConnection(c);
}
