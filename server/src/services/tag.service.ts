import { UpdateResult } from "typeorm";
import { Tag } from "../entity/tag";
import { TagRepository } from "../repository/tag.respository";

export class TagService {
    constructor(private readonly repository: TagRepository) { }

    async getAll(): Promise<Tag[]> {
        const tag = await this.repository.getAll();
        return tag;
    }

    async getById(id: number): Promise<Tag | undefined> {
        const tag = await this.repository.getById(id);
        return tag;
    }

    async checkExistByName(name: string): Promise<boolean> {
        const isExist = await this.repository.getByTag(name);
        return isExist ? true : false;
    }

}