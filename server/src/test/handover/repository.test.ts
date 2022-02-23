import { Handover } from "../../entity/handover";
import { HandoverRepository } from "../../repository/handover.repository";
import { getConnection } from '../connect';

const repo = new HandoverRepository()
let connection: any

beforeAll(async () => {
    connection = await getConnection()
})

afterAll(async () => {
    await connection.close()
})

describe("Test Handover Repository", () => {
    test("test get all", async () => {
        const mockData = {
            "id": 1,
            "userId": 1,
            "sysmoney": 1,
            "realcash": 1,
            "status": 0,
            "createdAt": "2022-01-19T15:19:46.211Z"
        }
        Handover.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.getAll(0)
        expect(data).toBe(mockData)
    })

    // test("test get by id", async () => {
    //     const mockData = {
    //         "id": 1,
    //         "userId": 1,
    //         "sysmoney": 1,
    //         "realcash": 1,
    //         "status": 0,
    //         "createdAt": "2022-01-19T15:19:46.211Z"
    //     }
    //     Handover.find = jest.fn().mockReturnValue(mockData)
    //     const data = await repo.getById(0,1)
    //     expect(data).toBe(mockData)
    // })

    // test("test get by user id", async () => {
    //     const mockData = {
    //         "id": 1,
    //         "userId": 1,
    //         "sysmoney": 1,
    //         "realcash": 1,
    //         "status": 0,
    //         "createdAt": "2022-01-19T15:19:46.211Z"
    //     }
    //     Handover.find = jest.fn().mockReturnValue(mockData)
    //     const data = await repo.getByUserId(1)
    //     expect(data).toBe(mockData)
    // })
    test("test create", async () => {
        const mockData = {
            "userId": 1,
            "sysmoney": 1,
            "realcash": 1,
            "status": 0,
            "createdAt": "2022-01-20T15:19:46.211Z"
        }
        Handover.save = jest.fn().mockReturnValue(mockData)
        const newHandover = new Handover();
        Object.assign(newHandover, mockData);
        const data = await repo.create(newHandover)
        expect(data).toBe(mockData)
    })
    test("test update", async () => {
        const mockData ={
           "rowAffected":1
        }
        Handover.update = jest.fn().mockReturnValue(mockData)
        const newStore = new Handover();
        const data = await repo.update(newStore)
        expect(data).toBe(mockData)
       })

})