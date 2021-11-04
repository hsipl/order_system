import { UpdateResult } from "typeorm";
import { Store } from "../entity/store";
import { IStoreRepository, StoreParam } from "../interafaces/api/repository/store.interface";

export class StoreRepository implements IStoreRepository{

    async getAll(): Promise<Store[]> {
        return await Store.find({status:0})
    }
    
    async getById(id: number): Promise<Store | undefined> {
        return await Store.findOne({id:id})
    }
    async getByName(name: string): Promise<Store | undefined> {
        return await Store.findOne({
            name: name,
        })
    }

    async create(s: Store): Promise<Store> {
        return await Store.save(s)
    }
    
    async update(id:number, s: Store): Promise<UpdateResult | undefined>  {
        return await Store.update(id,s)
    }

    async delete(id:number,s: Store):Promise<UpdateResult | undefined>  {  
        return await Store.update(id,s)
    }
}

