import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Store } from './store';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 256 })
  password: string;

  @ManyToOne(() => Store, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id' })
  storeId: number;

  @Column({
    unsigned: true,
    type: 'tinyint',
    comment: '0: Normal Employee, 1: Store Manager ',
    default: 0,
  })
  type: number;

  @Column({
    unsigned: true,
    type: 'tinyint',
    comment: '0: On-boarding, 1: Quit',
    default: 0,
  })
  status: number;

  @Column({
    length: 256,
    nullable: true,
  })
  image: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;
}
