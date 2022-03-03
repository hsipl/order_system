import { Connection, createConnection } from 'typeorm';
import { User } from '../../entity/user';
import { StoreRepository } from '../../repository/store.repository';
import { UserRepository } from '../../repository/user.repository';
import { getConnection } from '../connect';

const repo = new UserRepository()
const storeRepo = new StoreRepository()
let connection: any;

beforeAll(async () => {
    connection = await getConnection()
})

afterAll(async () => {
    await connection.close()
})

describe("Test User Repository", () => {
    test("test getby id", async () => {
        const mockData = {
            "id": 1,
            "name": "hsipl206",
            "username": "hsipl206",
            "password": "hsipl206",
            "storeId": 1,
            "type": 1,
            "createdAt": "2022-01-19T16:08:43.686Z"
        }
        User.findOne = jest.fn().mockReturnValue(mockData)
        const data = await repo.findOne({ id: 1 })
        expect(data).toBe(mockData)
    })
    test("test create", async () => {
        const mockData = {
            "id": 2,
            "name": "mcdonalds",
            "username": "mcdonalds",
            "password": "mcdonalds",
            "storeId": 3,
            "type": 0,
            "createdAt": "2022-01-19T16:08:43.686Z",
            "updatedAt": "2022-01-19T16:08:43.686Z"
        }
        User.save = jest.fn().mockReturnValue(mockData)
        const newUser = new User();
        Object.assign(newUser, mockData);
        const data = await repo.create(newUser)
        expect(data).toBe(mockData)
    })
    test("get main store auth", async () => {
        const mockData = {
            "id": 2,
            "name": "mcdonalds",
            "username": "mcdonalds",
            "password": "mcdonalds",
            "storeId": 3,
            "type": 0,
            "status": 0,
            "createdAt":"2022-01-13T14:37:43.410Z:",
            "updatedAt": "2022-01-13T14:37:43.410Z:"
        }
        User.find = jest.fn().mockReturnValue(mockData)
        const store = await storeRepo.getById(3);
        const newUser = new User();
        const resData = {
            "u_id": 2,
            "u_name": "mcdonalds",
            "u_username": "mcdonalds",
            "u_password": "mcdonalds",
            "u_store_id": 3,
            "u_createdAt": "2022-01-13T14:37:43.410Z:",
            "u_updatedAt": "2022-01-13T14:37:43.410Z:",
            "u_type": 0,
            "u_status": 0,
            "s_id": store?.id,
            "s_name": store?.name,
            "s_type": store?.type,
            "s_status": store?.status,
            "s_image": store?.image,
            "s_createdAt": store?.createdAt,
            "s_updatedAt": store?.updatedAt,
            "s_deletedAt": store?.deletedAt
        }
        User.find = jest.fn().mockReturnValue(resData)
        Object.assign(newUser, mockData);
        const data = await repo.findMainStoreAuth({ username: "mcdonalds", type: 3, storeId: 3 });
        expect(data).toBe(data)
    })
    test("get employee", async () => {
        const mockData = {
            "id": 2,
            "name": "mcdonalds",
            "username": "mcdonalds",
            "password": "mcdonalds",
            "storeId": 3,
            "type": 0,
            "status": 0,
        }
        User.find = jest.fn().mockReturnValue(mockData)
        const newUser = new User();
        Object.assign(newUser, mockData);
        const data = await repo.getAllEmployee({ storeId: 3 })
        expect(data).toBe(mockData)
    })

})