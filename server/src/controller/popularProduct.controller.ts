import { PopularProductsService } from '../services/popularProducts.service';

class PopularProduct {
    private readonly service: PopularProductsService;

    constructor(service: PopularProductsService) {
        this.service = service;
    }

    async sort(turnoverId: number) {

    }
}
