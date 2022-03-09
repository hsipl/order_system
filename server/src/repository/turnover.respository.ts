import { FindConditions } from "typeorm";
import { Turnover } from "../entity/turnover";

export class TurnoverRepository {
    async get(query: FindConditions<Turnover>): Promise<Turnover[]> {
        return await Turnover.find({
            where: query,
            order: {
                createdAt: "ASC"
            }
        })
    }
    async create(t: Turnover): Promise<Turnover> {
        return await Turnover.save(t);
    }
}