import { FindConditions } from "typeorm";
import { Turnover } from "../entity/turnover";
import { ITurnoverCreateParams } from "../interafaces/turnover.interface";
import { TurnoverRepository } from "../repository/turnover.respository";

export class TurnoverService {
    constructor(private readonly repository: TurnoverRepository) { }

    async get(query: FindConditions<Turnover>): Promise<Turnover[]> {
        const turnover = await this.repository.get(query);
        return turnover;
    }

    public async create(params: ITurnoverCreateParams): Promise<Turnover> {
        const turnover = new Turnover();
        Object.assign(turnover, params)
        return await this.repository.create(turnover);
    }

}