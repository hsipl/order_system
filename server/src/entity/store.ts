import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: number
 *         name:
 *           type: string
 *         type:
 *           type: tinyint
 *           format: number
 *           unsigned: true
 *           default: 0
 *           description: 0 Branch Store, 1 Head Store
 *         status:
 *           type: tinyint
 *           format: number
 *           unsigned: true
 *           default: 0
 *           description: 0 Opening, 1 Closing
 *         image:
 *           type: string
 *           nullable: true
 *           length: 256
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         deletedAt:
 *           type: string
 */

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  name: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    comment: '0: Branch Store, 1: Head Store',
    default: 0,
  })
  type: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
    comment: '0: Opening, 1: Closing',
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
