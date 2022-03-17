import { ITurnoverCreateParams } from '../interafaces/turnover.interface';
import { TurnoverService } from '../services/turnover.service';
import { Turnover } from '../entity/turnover';
import { NextFunction, Request, Response } from 'express';
import { addHours, subDays } from 'date-fns';
import { OrderService } from '../services/order.service';
import PopularProductController from './popularProduct.controller';

class TurnoverController {
    private readonly service: TurnoverService;
    private readonly orderService: OrderService;
    private readonly popularProductController: PopularProductController
    constructor(service: TurnoverService, orderService: OrderService, popularProductController: PopularProductController) {
        this.service = service;
        this.orderService = orderService
        this.popularProductController = popularProductController;
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const query = new Turnover();
        Object.assign(query, req.query)
        const turnover = await this.service.get(query);
        res.status(200).json(turnover);
    }

    async calculate() {
        const date = new Date('2022-03-20')
        // const date = new Date()
        const order = await this.orderService.getByDate(date)
        if (order.length != 0) {
            // 需要加上判斷是否 order 為空的
            const store: number[] = [];
            order.forEach(o => {
                store.push(o.storeId);
            })
            const stores = [...new Set(store.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
            const amounts: number[] = [];
            stores.forEach(s => {
                let amount: number = 0;
                order.forEach(o => {
                    if (JSON.stringify(o.storeId) == JSON.stringify(s)) {
                        amount = amount + o.orderProducts.map(el => el.price).reduce((a, b) => a + b);
                    }
                })
                amounts.push(amount)
            })

            const params: ITurnoverCreateParams[] = [];
            stores.forEach((s, i) => {
                params.push({ amount: amounts[i], storeId: s });
            })
            const newTurnover = await this.service.create(params)
            if (newTurnover) {
                this.popularProductController.sort(newTurnover, date)
            } else {
                console.log('create turnover error.');
            }
        }
    }
}
export default TurnoverController;