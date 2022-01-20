import { Connection, createConnection } from 'typeorm';
import { Store } from '../../entity/store';
import { StoreRepository } from "../../repository/store.repository";
import { getConnection } from './connect';
const repo = new StoreRepository()
let connection: any

beforeAll(async () => {
   connection =  await getConnection()
})

afterAll(async () => {
   await connection.close()
})

describe("Testing Store Repository", () => {
   test("test get all" , async () => {
    const mockData = {
        "id": 1,
        "name": "kcy main store",
        "type": 1,
        "status": 0,
        "image": "",
        "createdAt": "2022-01-19T15:19:46.211Z"
    }
    Store.find = jest.fn().mockReturnValue(mockData)
    const data = await repo.getAll()
    expect(data).toBe(mockData)
   })
   test("test getbyid", async() => {
    const mockData = {
        "id": 1,
        "name": "kcy main store",
        "type": 1,
        "status": 0,
        "image": "",
        "createdAt": "2022-01-19T15:19:46.211Z"
    }
    Store.findOne = jest.fn().mockReturnValue(mockData)
    const data = await repo.getById(1)
    expect(data).toBe(mockData)
   })
   test("test getbyname", async () => {
    const mockData = {
        "id": 1,
        "name": "kcy main store",
        "type": 1,
        "status": 0,
        "image": "",
        "createdAt": "2022-01-19T15:19:46.211Z"
    }
    Store.findOne = jest.fn().mockReturnValue(mockData)
    const data = await repo.getByName("kcy main store")
    expect(data).toBe(mockData)
   })

   test("test create", async () => {
    const mockData ={
        "name": "mcdonalds",
        "type": 0,
        "image": "image-1642608523675-918409086.png",
        "deletedAt": null,
        "id": 2,
        "status": 0,
        "createdAt": "2022-01-19T16:08:43.686Z",
        "updatedAt": "2022-01-19T16:08:43.686Z"
    }
    Store.save = jest.fn().mockReturnValue(mockData)
    const newStore = new Store();
    Object.assign(newStore, mockData);
    const data = await repo.create(newStore)
    expect(data).toBe(mockData)
   })

   test("test update", async () => {
    const mockData ={
       "rowAffected":1
    }
    Store.update = jest.fn().mockReturnValue(mockData)
    const newStore = new Store();
    const data = await repo.update(newStore)
    expect(data).toBe(mockData)
   })

   test("test delete", async () => {
    const mockData ={
       "rowAffected":1
    }
    Store.update = jest.fn().mockReturnValue(mockData)
    const newStore = new Store();
    const data = await repo.delete(1,newStore)
    expect(data).toBe(mockData)
   })
})