import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  name: string;

  @Column({
    type: "tinyint",
    unsigned: true,
    comment: "0: Branch Store, 1: Head Store",
    default: 0,
  })
  type: number;

  @Column({
    type: "tinyint",
    unsigned: true,
    comment: "0: Opening, 1: Closing",
    default: 0,
  })
  status: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;
}

