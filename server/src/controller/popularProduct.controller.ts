import { Turnover } from '../entity/turnover';
import { OrderService } from '../services/order.service';
import { PopularProductsService } from '../services/popularProducts.service';
import { IPopularProductDict, IPopularProductCreateParams } from '../interafaces/popularProducts.interface';

class PopularProductController {
    private readonly service: PopularProductsService;
    private readonly orderService: OrderService;
    constructor(service: PopularProductsService, orderService: OrderService) {
        this.service = service;
        this.orderService = orderService;
    }

    async sort(turnovers: Turnover[], date: Date) {
        turnovers.forEach(async t => {
            const storeId = t.storeId
            const order = await this.orderService.getByDateAndStoreId(date, storeId);
            let data: { [k: string]: number } = {}
            order.forEach(o => {
                o.orderProducts.forEach(op => {
                    let keys = Object.keys(data);
                    const name: string = op.name;
                    if (keys.find(e => e == name)) {
                        // data[name] = data[name] + Number(op.quantity);
                        data[name] = data[name] + 1;
                    } else {
                        let obj: { [k: string]: number } = {};
                        obj[name] = 1;
                        // obj[name] = Number(op.quantity);
                        data = Object.assign(data, obj)
                    }
                });
            })
            const sorTable = Object.fromEntries(
                Object.entries(data).sort(([, a], [, b]) => a - b)
            );
            const sorData = Object.entries(sorTable).reverse()
            const params: IPopularProductCreateParams[] = []
            let ranking: number = 1;
            sorData.forEach(s => {
                const p: IPopularProductCreateParams = { turnoverId: storeId, name: s[0], quantity: s[1], ranking: ranking }
                ranking = ranking + 1;
                params.push(p)

            })
            await this.service.create(params);
        })

    }
}
export default PopularProductController;