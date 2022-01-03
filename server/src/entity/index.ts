import { Connection } from 'typeorm';
import { Store } from './store';
import { User } from './user';
import { Tag } from './tag';
import { Handover } from './handover';

export default function getConn(c: Connection) {
  User.useConnection(c);
  Store.useConnection(c);
  Tag.useConnection(c);
  Handover.useConnection(c);
}
