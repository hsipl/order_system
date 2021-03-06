import { FindConditions, Like, UpdateResult } from "typeorm";
import { Product } from "../entity/product";
import { ProductRepository } from "../repository/product.repository";
import { IProductCreateParams, IProductUpdateParams, IProductDeleteParams, IProudctUpdate } from "../interafaces/product.interface";

export class ProductService {
    constructor(private readonly repository: ProductRepository) { }

    public async get(query:FindConditions<Product>): Promise<Product[]> {
        if (Object.keys(query).includes('name')) {
            query.name = Like('%' + query.name + '%');
          }
        const product = await this.repository.get(query);
        return product;
    }

    public async getById(id: number): Promise<Product | undefined> {
        const product = await this.repository.getById(id);
        return product;
    }

    public async getByStoreId(storeId: number): Promise<Product[]> {
        const product = await this.repository.getByStoreId(storeId);
        return product;
    }

    public async getByIds(id: number[]): Promise<Product[] | undefined> {
        const product = await this.repository.getByIds(id);
        return product;
    }
    
    public async checkExistByName(name: string, storeId: number): Promise<boolean> {
        const isExist = await this.repository.getByName(name, storeId)
        return isExist ? true : false;
    }

    public async checkExitById(id: number): Promise<boolean> {
        const isExist = await this.repository.getById(id);
        return isExist ? true : false;
    }

    public async create(params: IProductCreateParams): Promise<Product> {
        const product = new Product()
        Object.assign(product, params);
        return await this.repository.create(product);
    }

    public async updateRelation(params: IProductCreateParams): Promise<Product> {
        const product = new Product()
        Object.assign(product, params);
        return await this.repository.create(product);
    }

    public async update(params: IProductUpdateParams): Promise<UpdateResult | undefined> {
        const product = new Product();
        Object.assign(product, params);
        return await this.repository.update(product);
    }

    public async delete(params: IProductDeleteParams): Promise<UpdateResult | undefined> {
        const { id } = params;
        const product = await Product.findOne({ id });
        if (product) {
            product.status = 1;
            return await this.repository.update(product);
        }
    }

}