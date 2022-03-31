import { FindConditions } from "typeorm";
import { PopularProducts } from "../entity/popularProducts";

export class PopularProductsRepository {
    async get(query: FindConditions<PopularProducts>): Promise<PopularProducts[]> {
        return PopularProducts.find({
            where: query,
            order: {
                createdAt: "ASC"
            }
        })
    }
    async create(p: PopularProducts[]): Promise<PopularProducts[]> {
        return await PopularProducts.save(p);
    }

}