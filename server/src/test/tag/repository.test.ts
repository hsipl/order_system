import { Tag } from '../../entity/tag';
import { TagRepository } from '../../repository/tag.respository';
import { getConnection } from '../connect';
const repo = new TagRepository()
let connection: any

beforeAll(async () => {
    connection = await getConnection()
})

afterAll(async () => {
    await connection.close()
})

describe("Test Tag Repository", () => {
    test("test get all", async () => {
        const mockData = {
            "id": 1,
            "tag": "胡椒粉",
            "status": 0,
            "createdAt": "2022-01-19T15:19:46.211Z"
        }
        Tag.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.get({})
        expect(data).toBe(mockData)
    })
    test("test get by id", async () => {
        const mockData = {
            "id": 1,
            "tag": "胡椒粉",
            "status": 0,
            "createdAt": "2022-01-19T15:19:46.211Z"
        }
        Tag.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.get({ id: 1 })
        expect(data).toBe(mockData)
    })
    test("test get by tag", async () => {
        const mockData = {
            "id": 1,
            "tag": "胡椒粉",
            "status": 0,
            "createdAt": "2022-01-19T15:19:46.211Z"
        }
        Tag.find = jest.fn().mockReturnValue(mockData)
        const data = await repo.get({ tag: '胡' });
        expect(data).toBe(mockData)
    })
    test("test create", async () => {
        const mockData = {
            "tag": "辣粉",
            "status": 0
        }
        Tag.save = jest.fn().mockReturnValue(mockData);
        const newTag = new Tag();
        Object.assign(newTag, mockData);
        const data = await repo.create(newTag);
        expect(data).toBe(mockData)
    })
    test("test update", async () => {
        const mockData = {
            "rowAffected": 1
        }
        Tag.update = jest.fn().mockReturnValue(mockData)
        const newTag = new Tag();
        const data = await repo.update(1,newTag)
        expect(data).toBe(mockData)
    })

})