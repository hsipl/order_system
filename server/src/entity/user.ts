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

/**
 * @swagger
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             format: number
 *             unsigned: true
 *           name:
 *             type: string
 *             length: 64
 *           username:
 *             type: string
 *             unique: true
 *             length: 64
 *           password:
 *             type: string
 *             length: 256
 *           storeId:
 *             $ref: '#/components/schemas/Store'
 *           type:
 *             type: tinyint
 *             format: number
 *             unsigned: true
 *             description: 0 Normal Employee, 1 Store Manager
 *             default: 0
 *           status:
 *             type: tinyint
 *             format: number
 *             unsigned: true
 *             description: 0 On-boarding, 1 Quit
 *             default: 0
 *           image:
 *             type: string
 *             nullable: true
 *             length: 256
 *           createdAt:
 *             type: string
 *           updatedAt: 
 *             type: string
 *           deleteAt:
 *             type: string
 */

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
  storeId: Store;

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
