import { UpdateResult } from "typeorm";
import { Store } from "../../../entity/store";


export interface IStoreRepository {
    getAll(): Promise<Store[]>
    getById(id: number): Promise<Store | undefined>
    getByName(name: string): Promise<Store| undefined>
    create(s: Store): Promise<Store>
    update(id: number, s: Store): Promise<UpdateResult | undefined> 
    delete(id: number, s: Store): Promise<UpdateResult | undefined> 
}

export interface StoreParam {
    id?: number
    name: string
    type: number
    status: number
}