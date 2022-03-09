import { Turnover } from "../entity/turnover";

export class TurnoverRepository{
    async get():Promise<Turnover[]>{
        return await Turnover.find({
            
        })
    }
}