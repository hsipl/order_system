import { Product } from '../../entity/product';
import { ProductRepository } from '../../repository/product.repository';
import { getConnection } from '../connect';
const repo = new ProductRepository()
let connection: any

beforeAll(async () => {
    connection = await getConnection()
})

afterAll(async () => {
    await connection.close()
})

describe("Test Product Repository", () => {
    test("test get all", async () => {
        const mockData = {
            "id": 1,
            "name": "鹽酥雞",
            "price": "50",
            "image": "",
            "storeId": 1,
            "category": 0,
            "status": 0,
            "createdAt": "2022-01-19T16:08:43.686Z",
            "updatedAt": "2022-01-19T16:08:43.686Z"
        }
        Product.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.getAll()
        expect(data).toBe(mockData)
    })
    test("test create", async () => {
        const mockData = {
            "name": "雞排",
            "price": "60",
            "image": "",
            "storeId": 1,
            "category": 0,
            "status": 0,
            "createdAt": "2022-01-19T16:09:43.686Z",
            "updatedAt": "2022-01-19T16:09:43.686Z"
        }
        Product.save = jest.fn().mockResolvedValue(mockData)
        const newProduct = new Product();
        Object.assign(newProduct, mockData);
        const data = await repo.create(newProduct)
        expect(data).toBe(mockData)
    })
    test("test update", async () => {
        const mockData = {
            "rowAffected": 1
        }
        Product.update = jest.fn().mockReturnValue(mockData)
        const newProduct = new Product();
        const data = await repo.update(newProduct)
        expect(data).toBe(mockData)
    })
    test("test update relation", async () => {
        const mockData = {
            "name": "雞排",
            "price": "60",
            "image": "",
            "storeId": 1,
            "category": 0,
            "status": 0,
            "createdAt": "2022-01-19T16:09:43.686Z",
            "updatedAt": "2022-01-19T16:09:43.686Z"
        }
        Product.update = jest.fn().mockReturnValue(mockData)
        const newProduct = new Product();
        const data = await repo.update(newProduct)
        expect(data).toBe(mockData)
    })
    // test("test get by id", async () => {
    //     const mockData = {
    //         "id": 1,
    //         "name": "鹽酥雞",
    //         "price": "50",
    //         "image": "",
    //         "storeId": 1,
    //         "category": 0,
    //         "status": 0,
    //         "createdAt": "2022-01-19T16:08:43.686Z",
    //         "updatedAt": "2022-01-19T16:08:43.686Z"
    //     }
    //     Product.find = jest.fn().mockReturnValue(mockData)
    //     const data = await repo.getById(3)
    //     console.log(data)
    //     expect(data).toBe(mockData)
    // })

    // test("test get by name", async () => {
    //     const mockData = {
    //         "id": 1,
    //         "name": "鹽酥雞",
    //         "price": "50",
    //         "image": "",
    //         "storeId": 1,
    //         "category": 0,
    //         "status": 0,
    //         "createdAt": "2022-01-19T16:08:43.686Z",
    //         "updatedAt": "2022-01-19T16:08:43.686Z"
    //     }
    //     Product.find = jest.fn().mockReturnValue(mockData)
    //     const data = await repo.getByName("鹽酥雞",1);
    //     expect(data).toBe(mockData)
    // })

    test("test get by store id", async () => {
        const mockData = {
            "id": 1,
            "name": "鹽酥雞",
            "price": "50",
            "image": "",
            "storeId": 1,
            "category": 0,
            "status": 0,
            "createdAt": "2022-01-19T16:08:43.686Z",
            "updatedAt": "2022-01-19T16:08:43.686Z"
        }
        Product.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.getByStoreId(1);
        expect(data).toBe(mockData)
    })
})