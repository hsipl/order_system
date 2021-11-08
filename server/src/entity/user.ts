import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Store } from "./store";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 256 })
  password: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  storeId: number;

  @Column({
    unsigned: true,
    type: "tinyint",
    comment: "0: Normal Employee, 1: Store Manager ",
    default: 0,
  })
  type: number;

  @Column({
    unsigned: true,
    type: "tinyint",
    comment: "0: On-boarding, 1: Quit",
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
