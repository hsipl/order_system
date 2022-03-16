import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from "typeorm";
import { User } from "./user";

/**
 * @swagger
 *   components:
 *     schemas:
 *       Handover:
 *         type: object
 *         properties: 
 *           id:
 *             type: integer 
 *             format: number
 *           userId:
 *             $ref: '#/components/schemas/User'
 *           sysmoney:
 *             type: integer
 *             format: number
 *           realcash:
 *             type: integer
 *             format: number
 *           status:
 *             type: tinyint
 *             format: number
 *             unsigned: true
 *             default: 0
 *             description: 0 Opening 1 Closing
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *           deletedAt:
 *             type: string
 */

@Entity()
export class Handover extends BaseEntity{
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    userId: number;

    @Column({ type: "int" })
    sysmoney: number;

    @Column({ type: "int" })
    realcash: number;

    @Column({
        type: 'tinyint',
        unsigned: true,
        comment: '0: Opening, 1: Closing',
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
