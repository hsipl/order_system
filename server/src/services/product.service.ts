import { UpdateResult } from "typeorm";
import { Product } from "../entity/product";
import { ProductRepository } from "../repository/product.repository";
import { IProductCreateParams, IProductUpdateParams, IProductDeleteParams } from "../interafaces/product.interface";
export class ProductService {
    constructor(private readonly repository: ProductRepository) { }

    async getAll(): Promise<Product[]> {
        const product = await this.repository.getAll();
        return product;
    }

    async getById(id: number): Promise<Product | undefined> {
        const product = await this.repository.getById(id);
        return product;
    }

    async getByStoreId(storeId: number): Promise<Product[]> {
        const product = await this.repository.getByStoreId(storeId);
        return product;
    }

    async checkExistByName(name: string): Promise<boolean> {
        const isExist = await this.repository.getByName(name)
        return isExist ? true : false;
    }

    async checkExitById(id: number): Promise<boolean> {
        const isExist = await this.repository.getById(id);
        return isExist ? true : false;
    }

    async create(params: IProductCreateParams): Promise<Product> {
        const product = new Product()
        Object.assign(product, params);
        return await this.repository.create(product);
    }

    async update(params: IProductUpdateParams): Promise<UpdateResult | undefined> {
        const product = new Product();
        Object.assign(product, params);
        return await this.repository.update(product);
    }

    async delete(params: IProductDeleteParams): Promise<UpdateResult | undefined> {
        const { id } = params;
        const product = await Product.findOne({ id });
        if (product) {
            product.status = 1;
            return await this.repository.update(product);
        }
    }

}