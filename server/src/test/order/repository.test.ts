import { getConnection } from '../connect';
import { Order } from '../../entity/order';
import { OrderRepository } from '../../repository/order.repository';

const repo = new OrderRepository()
let connection: any

beforeAll(async () => {
    connection = await getConnection()
})

afterAll(async () => {
    await connection.close()
})

describe("Test Order Repository", () => {
    test("test get all", async () => {
        const mockData = {
            "id": 1,
            "status": "0",
            "storeId": 1,
            "pay": 0,
            "createdAt": "2022-01-19T15:19:46.211Z"
        }
        Order.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.getAll()
        expect(data).toBe(mockData)
    });
    // test("test get by id", async () => {
    //     const mockData = {
    //         "id": 1,
    //         "status": "0",
    //         "storeId": 1,
    //         "pay": 0,
    //         "createdAt": "2022-01-19T15:19:46.211Z",
    //     }
    //     Order.find = jest.fn().mockReturnValue(mockData)
    //     const data = await repo.getById(1)
    //     expect(data).toBe(mockData)
    // });
    // test("test get by store id", async () => {
    //     const mockData = {
    //         "id": 1,
    //         "status": "0",
    //         "storeId": 1,
    //         "pay": 0,
    //         "createdAt": "2022-01-19T15:19:46.211Z",
    //     }
    //     Order.find = jest.fn().mockReturnValue(mockData)
    //     const data = await repo.getByStoreId(1)
    //     expect(data).toBe(mockData)
    // });
    test("test create", async () => {
        const mockData = {
            "status": "0",
            "storeId": 1,
            "pay": 0,
        }
        Order.save = jest.fn().mockReturnValue(mockData)
        const newOrder = new Order();
        Object.assign(newOrder, mockData);
        const data = await repo.create(newOrder)
        expect(data).toBe(mockData)
    });

    // test("test update", async () => {
    //     const mockData = {
    //         "rowAffected": 1
    //     }
    //     Order.update = jest.fn().mockReturnValue(mockData)
    //     const newOrder = new Order();
    //     const data = await repo.update(newOrder)
    //     expect(data).toBe(mockData)
    // })
})