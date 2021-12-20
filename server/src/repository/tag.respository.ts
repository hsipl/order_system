import { Not, UpdateResult } from "typeorm";
import { Tag } from "../entity/tag";

const field: (keyof Tag)[] = ["id", "tag", "status"];

export class TagRepository {
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
    /** 新增時，查看是否有命名重複 */
    async getByTag(tag: string): Promise<Tag | undefined> {
        return await Tag.findOne({
            where: {
                tag: tag,
            },
            select: field,
        });
    }
    /** 更新時，查看是否有與其它命名重複 */
    async getUpdateByTag(id: number, tag: string): Promise<Tag | undefined> {
        return await Tag.findOne({
            where: {
                tag: tag,
                id: Not(id)
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