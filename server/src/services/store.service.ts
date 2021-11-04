import { UpdateResult } from "typeorm";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import ErrorHandler from "../controller/error.controller";
import { Store } from "../entity/store";
import { IStoreRepository, StoreParam } from "../interafaces/api/repository/store.interface";



export class StoreService {
    constructor(private readonly repository: IStoreRepository){}

    async getAll(): Promise<Store[]>{
        const store = await this.repository.getAll()
        return store
    }
    
    async getById(id: number): Promise<Store | undefined> {
        const store = await this.repository.getById(id)
        return store
    }

    async getByName(name: string): Promise<boolean> {
        const isExist = await this.repository.getByName(name)
        return isExist ? true : false
    }

    async create(name: string, status: number, type: number): Promise<Store> {
        const store = new Store()
        store.name = name
        store.type = type
        store.status = status  
        return await this.repository.create(store)  
    }
    
    async update(id: number, name: string, status: number, type: number): Promise<UpdateResult | undefined> {
        const store = new Store()
        store.name = name
        store.type = type
        store.status = status
        return await this.repository.update(id,store)
    }

    async delete(id: number): Promise<UpdateResult | undefined> {
        const store = await Store.findOne({id:id})
        if (store) {
            store.status = 1
            return await this.repository.update(store.id, store)
        }
    }
}





