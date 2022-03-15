import { ITurnoverCreateParams } from '../interafaces/turnover.interface';
import { TurnoverService } from '../services/turnover.service';
import { Turnover } from '../entity/turnover';
import { NextFunction, Request, Response } from 'express';
import { addHours, subDays } from 'date-fns';
import { OrderService } from '../services/order.service';

class TurnoverController {
    private readonly service: TurnoverService;
    private readonly orderService: OrderService;
    constructor(service: TurnoverService, orderService: OrderService) {
        this.service = service;
        this.orderService = orderService
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const query = new Turnover();
        Object.assign(query, req.query)
        const turnover = await this.service.get(query);
        res.status(200).json(turnover);
    }

    async calculate(req: Request, res: Response, next: NextFunction) {
        const date = new Date('2022-02-15')
        const order = await this.orderService.getByDate(date)
        let amount: number = 0;
        order.forEach(o => {
            amount = amount + o.orderProducts.map(el => el.price).reduce((a, b) => a + b);
        })
        const params: ITurnoverCreateParams = { amount: amount };
        const newTurnover = await this.service.create(params)
        if (newTurnover) {
            const { id } = newTurnover
        } else {
            console.log('create turnover error.');
        }
        res.status(200).json({ result: true });
    }
}
export default TurnoverController;