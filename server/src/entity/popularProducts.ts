import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { Turnover } from './turnover';

@Entity('popular_products')
export class PopularProducts extends BaseEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => Turnover, turnover => turnover.id)
    @JoinColumn({ name: 'turnover_id' })
    turnoverId: Turnover;

    @Column({ length: 64 })
    name: string;

    @Column()
    quantity: number;

    @Column()
    ranking: number;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
}