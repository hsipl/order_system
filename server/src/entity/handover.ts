import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
<<<<<<< HEAD
} from "typeorm";
import { User } from "./user";
@Entity()
export class Handover {
=======
    BaseEntity,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Handover extends BaseEntity{
>>>>>>> 1c1c257406f06ca5749cb6617c70fe2e9feccd12
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @Column({ type: "int" })
    sysmoney: number;

    @Column({ type: "int" })
    realcash: number;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;
<<<<<<< HEAD
}
=======
}
>>>>>>> 1c1c257406f06ca5749cb6617c70fe2e9feccd12
