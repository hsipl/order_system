import { Connection, createConnection } from 'typeorm';
import { Store } from '../../entity/store';
import { StoreRepository } from "../../repository/store.repository";
import { StoreService } from '../../services/store.service';
import CacheService from "../../services/cache.service"
import { getConnection } from '../connect';

let connection: any
// const repo = new StoreRepository()
// const cache = new CacheService()
// const srv = new StoreService(repo,cache)


beforeAll(async () => {
    connection = await getConnection()    
})

afterAll(async () => {
    await connection.close()
})

describe("Test StoreService", () => {
    test("unimplement", async () => {
        return
    })
})