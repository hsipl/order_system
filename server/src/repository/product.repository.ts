import { UpdateResult, Not } from "typeorm";
import { Product } from "../entity/product";

const field: (keyof Product)[] = ["id", "storeId", "name", "money", "image", "category", "status"];

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

    async getByName(id: number, name: string): Promise<Product | undefined> {
        return await Product.findOne({
            relations: ["tags"],
            where: { name: name, id: Not(id) },
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

    async updateRelation(p:Product):Promise<Product>{
        return await Product.save(p)
    }
    
    async update(p: Product): Promise<UpdateResult | undefined> {
        return await Product.update(p.id, p);
    }

    async delete(p: Product): Promise<UpdateResult | undefined> {
        return await Product.update(p.id, p);
    }

}