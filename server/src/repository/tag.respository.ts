import { UpdateResult } from "typeorm";
import { Tag } from "../entity/tag";

const field: (keyof Tag)[] = ["id", "tag", "status"];

export class TagRepository {
    /** 取得所有Tag選項 */
    async getAll(): Promise<Tag[]> {
        return await Tag.find({
            where: {
                status: 0,
            },
            select: field,
        });
    }

    async getById(id: number): Promise<Tag | undefined> {
        return await Tag.findOne({
            where: {
                id: id,
                status: 0,
            },
            select: field,
        });
    }

    async create(t: Tag): Promise<Tag> {
        return await Tag.save(t)
    }

    async update(id: number, t: Tag): Promise<UpdateResult | undefined> {
        return await Tag.update(id, t);
    }

    async delete(id: number, t: Tag): Promise<UpdateResult | undefined> {
        return await Tag.update(id, t);
    }
}