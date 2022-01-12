import { Order } from "../entity/order";
import { OrderProduct } from "../entity/orderProuct";
import { Product } from "../entity/product";
import { IOrderProductParam } from "../interafaces/order.interface";
import { IOrderProductCreateParams } from "../interafaces/orderProduct.interafaces";
import { OrderProductService } from "../services/orderProduct.service";

class OrderProductController {
    public readonly service: OrderProductService;
    constructor(service: OrderProductService) {
        this.service = service;
    }
    async getByIds(orderId: number): Promise<OrderProduct[] | undefined> {
        const orders = await this.service.getById(orderId);
        return orders;
    }
    /**
     *  新增 order_product db 
     * @param products req.body裡的 products
     * @param order 新增 order 成功的回傳數值
     * @param productData products 關聯的 product 資料
     */
    async create(products: IOrderProductParam[],  productData: Product[]): Promise<OrderProduct[] | undefined> {
        try {
            const params: IOrderProductCreateParams[] = [];
            await products.forEach(p => {
                const product = productData.find(pd => pd.id == p.id);
                if (product) {
                    const description: string = p.description;
                    // const orderId: Order = order;
                    const price: number = product.price;
                    const name: string = product.name;
                    const orderProduct: IOrderProductCreateParams = { description,  price, name };
                    params.push(orderProduct)
                }
            });
            const newOrderProduct = await this.service.create(params);
            return newOrderProduct;
        } catch (e) {
            console.log('create order product db error.')
            return undefined;
        }


    }
}

export default OrderProductController;