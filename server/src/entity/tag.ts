import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
} from "typeorm";

/**
 * @swagger
 *   components:
 *     schemas:
 *       Tag:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             format: number
 *           tag:
 *             type: string
 *           status:
 *             type: tinyint
 *             format: number
 *             unsigned: true
 *             default: 0
 *             description: 0 Can choose, 1 Can't choose
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *           deletedAt:
 *             type: string
 */

@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 70})
    tag: string;

    @Column({
        type: "tinyint",
        unsigned: true,
        comment: "0: Can choose, 1: Can't choose ",
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