import { getConnection } from '../connect';
import { OrderProduct } from '../../entity/orderProuct';
import { OrderProductRepository } from '../../repository/orderProduct.repository';

const repo = new OrderProductRepository()
let connection: any

beforeAll(async () => {
    connection = await getConnection()
})

afterAll(async () => {
    await connection.close()
})

describe("Test orderProduct Repository", () => {
    test("test get all", async () => {
        const mockData = {
            "id": 1,
            "name": "鹽酥雞",
            "price": 30,
            "description": 0,
            "orderId": 1
        }
        OrderProduct.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.getAll()
        expect(data).toBe(mockData)
    })
    test("test get by id", async () => {
        const mockData = {
            "id": 1,
            "name": "鹽酥雞",
            "price": 30,
            "description": 0,
            "orderId": 1
        }
        OrderProduct.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.getById(1)
        expect(data).toBe(mockData)
    })
    test("test get by ids", async () => {
        const mockData = {
            "id": 1,
            "name": "鹽酥雞",
            "price": 30,
            "description": 0,
            "orderId": 1
        }
        OrderProduct.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.getByIds([1])
        expect(data).toBe(mockData)
    })

    test("test create", async () => {
        const mockData = {
            "name": "鹽酥雞",
            "price": 30,
            "description": 0,
            "orderId": 1
        }
        OrderProduct.save = jest.fn().mockReturnValue(mockData)
        const newOrderProduct = new OrderProduct();
        Object.assign(newOrderProduct, mockData);
        const data = await repo.create([newOrderProduct])
        expect(data).toBe(mockData)
    })
    test("test delete", async () => {
        const mockData = true
        OrderProduct.delete = jest.fn().mockReturnValue(mockData)
        const data = await repo.delete([1])
        expect(data).toBe(true)
    })
})