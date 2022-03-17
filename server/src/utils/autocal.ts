import { CronJob } from 'cron';
import TurnoverController from '../controller/turnover.controller';
import { TurnoverService } from '../services/turnover.service';
import { TurnoverRepository } from '../repository/turnover.respository';
import { OrderService } from '../services/order.service';
import { OrderRepository } from '../repository/order.repository';
import PopularProductController from '../controller/popularProduct.controller';
import { PopularProductsService } from '../services/popularProducts.service';
import { PopularProductsRepository } from '../repository/popularProducts.respository';
class AutoCal {

  cronJob: CronJob;
  private readonly controller = new TurnoverController(new TurnoverService(new TurnoverRepository()), new OrderService(new OrderRepository()),
    new PopularProductController(new PopularProductsService(new PopularProductsRepository()), new OrderService(new OrderRepository())));
  constructor() {
    // 秒 分 時
    this.cronJob = new CronJob('0 0 04 * * *', async () => {
      try {
        await this.controller.calculate();
      } catch (e) {
        console.error(e);
      }
    });

    // Start job
    if (!this.cronJob.running) {
      this.cronJob.start();
    }
  }
}

export default new AutoCal();