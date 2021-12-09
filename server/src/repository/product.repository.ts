import { UpdateResult } from "typeorm";
import { Product } from "../entity/product";

const field: (keyof Product)[] = ["id", "storeId", "name", "money", "image", "category", "status"];

export class ProductRepository {
    async getAll(): Promise<Product[]> {
        return await Product.find({
            where: { status: 0 },
            select: field,
        });
    }

    async getById(id: number): Promise<Product | undefined> {
        return await Product.findOne({
            where: { id: id, status: 0, },
            select: field,
        })
    }

    async getByName(name: string): Promise<Product | undefined> {
        return await Product.findOne({
            where: { name: name, },
            select: field
        })
    }

    async getByStoreId(storeId: number): Promise<Product[]> {
        return await Product.find({
            where: { storeId: storeId },
            select: field
        })
    }

    async create(p: Product): Promise<Product> {
        return await Product.save(p)
    }

    async update(p: Product): Promise<UpdateResult | undefined> {
        return await Product.update(p.id, p);
    }

    async delete(p: Product): Promise<UpdateResult | undefined> {
        return await Product.update(p.id, p);
    }

}