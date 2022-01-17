import { UpdateResult, Not, In } from "typeorm";
import { Product } from "../entity/product";

const field: (keyof Product)[] = ["id", "storeId", "name", "price", "image", "category", "status"];

export class ProductRepository {
    async getAll(): Promise<Product[]> {
        return await Product.find({
            relations: ["tags"],
            where: { status: 0 },
            select: field,
        });
    }

    async getById(id: number): Promise<Product | undefined> {
        return await Product.findOne({
            relations: ["tags"],
            where: { id: id, status: 0, },
            select: field,
        })
    }

    /** Select Ids from Product */
    async getByIds(ids: number[]): Promise<Product[] | undefined> {
        return await Product.find({
            where: {
                id: In(ids)
            },
            select: field,
        });
    }


    async getByName(name: string, storeId: number): Promise<Product | undefined> {
        return await Product.findOne({
            relations: ["tags"],
            where: { name: name, storeId: storeId, status: 0 },
            select: field
        })
    }

    async getByStoreId(storeId: number): Promise<Product[]> {
        return await Product.find({
            relations: ["tags"],
            where: { storeId: storeId },
            select: field
        })
    }

    async create(p: Product): Promise<Product> {
        return await Product.save(p)
    }

    async updateRelation(p: Product): Promise<Product> {
        return await Product.save(p)
    }

    async update(p: Product): Promise<UpdateResult | undefined> {
        return await Product.update(p.id, p);
    }

    async delete(p: Product): Promise<UpdateResult | undefined> {
        return await Product.update(p.id, p);
    }

}