import { FindConditions, UpdateResult } from "typeorm";
import { Tag } from "../entity/tag";
import { TagRepository } from "../repository/tag.respository";
import { Like } from "typeorm";
export class TagService {
    constructor(private readonly repository: TagRepository) { }

    async get(query: FindConditions<Tag>): Promise<Tag[]> {
        if (Object.keys(query).includes('tag')) {
            query.tag = Like('%' + query.tag + '%');
        }
        const tag = await this.repository.get(query);
        return tag;
    }

    async getById(id: number): Promise<Tag | undefined> {
        const tag = await this.repository.getById(id);
        return tag;
    }

    async getByIds(id: number[]): Promise<Tag[] | undefined> {
        const tag = await this.repository.getByIds(id);
        return tag;
    }

    async checkExistByTag(name: string): Promise<boolean> {
        const isExist = await this.repository.getByTag(name);
        return isExist ? true : false;
    }

    async checkUpdateExitByTag(id: number, tag: string): Promise<boolean> {
        const isExist = await this.repository.getUpdateByTag(id, tag);
        return isExist ? true : false;
    }

    async checkExistByID(id: number): Promise<boolean> {
        const isExist = await this.repository.getById(id);
        return isExist ? true : false;
    }

    async create(tagName: string, status: number): Promise<Tag> {
        const tag = new Tag();
        tag.tag = tagName;
        tag.status = status;
        return await this.repository.create(tag);
    }

    async update(id: number, tagName: string, status: number): Promise<UpdateResult | undefined> {
        const tag = new Tag();
        tag.tag = tagName;
        tag.status = status;
        return await this.repository.update(id, tag);
    }

    async delete(id: number): Promise<UpdateResult | undefined> {
        const tag = await Tag.findOne({ id: id });
        if (tag) {
            tag.status = 1;
            return await this.repository.update(tag.id, tag);
        }
    }
}