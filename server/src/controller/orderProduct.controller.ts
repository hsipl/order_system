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

    async getRelation(order: Order): Promise<OrderProduct[]> {
        const orderProduct = await this.service.getRelation(order);
        return orderProduct;
    }

    /**
     *  新增 order_product db 
     * @param products req.body裡的 products
     * @param order 新增 order 成功的回傳數值
     * @param productData products 關聯的 product 資料
     */
    async create(products: IOrderProductParam[], productData: Product[]): Promise<OrderProduct[] | undefined> {
        try {
            const params: IOrderProductCreateParams[] = [];
            await products.forEach(p => {
                const product = productData.find(pd => pd.id == p.productId);
                if (product) {
                    const description: string = p.description;
                    // const orderId: Order = order;
                    const price: number = product.price;
                    const name: string = product.name;
                    const orderProduct: IOrderProductCreateParams = { description, price, name };
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

    async update(oldOrderProduct: OrderProduct[], products: IOrderProductParam[], productData: Product[]) {
        const newOrderProduct = await this.create(products, productData);

        if (newOrderProduct) {
            // 原本有的資料，要保存的
            const deleteData = oldOrderProduct.filter(o => {
                return newOrderProduct.some(n => {
                    return n.name !== o.name && n.price !== o.price && n.description !== o.description;
                })
            });
            const deleteDataId = deleteData.map(item => item['id']);
            const deleteRes = await this.delete(deleteDataId);
            if(deleteRes){
                console.log('-------');
                console.log(deleteRes);
            }
            // 原本有的資料，要保存的
            const mixData = oldOrderProduct.filter(o => {
                return newOrderProduct.some(n => {
                    return n.name === o.name && n.price === o.price && n.description === o.description;
                })
            });
            //要新增的資料
            const createData = newOrderProduct.filter(n => {
                return oldOrderProduct.some(o => {
                    return n.name !== o.name && n.price !== o.price && n.description !== o.description;
                })
            })
            const updateData = createData.concat(mixData);
            // if (updateData.length < products.length) {
            //     const upDataIndex = [];
            //     products.forEach(p => {

            //     });
            // }
            // console.log(updateData);
            return updateData;
        }



    }

    async delete(id: number[]) {
        return await this.service.delete(id);
    }
}

export default OrderProductController;