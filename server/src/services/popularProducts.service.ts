import { FindConditions } from "typeorm";
import { PopularProducts } from "../entity/popularProducts";
import { IPopularProductParams } from "../interafaces/popularProducts.interface";
import { PopularProductsRepository } from "../repository/popularProducts.respository";
export class PopularProductsService {
    constructor(private readonly repository: PopularProductsRepository) { }

    async get(query: FindConditions<PopularProducts>): Promise<PopularProducts[]> {
        const popularProducts = await this.repository.get(query);
        return popularProducts;
    }

    async create(params: IPopularProductParams[]): Promise<PopularProducts[]> {
        const paramsData: PopularProducts[] = [];
        params.forEach(p => {
            const popularProducts = new PopularProducts();
            Object.assign(popularProducts, p);
            paramsData.push(popularProducts);
        })
        return await this.repository.create(paramsData);
    }

}