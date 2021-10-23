import { Model, Association } from "sequelize"
import { BelongsTo, DataType } from "sequelize-typescript"
import dotenv from "dotenv"
import Order from "./order"
import DBConnection from "../models/mysql"
interface OrderProductAttribute {
    id?: number
    order_id?: number
    product_id?: number
    status?: number
}
class OrderProduct extends Model<OrderProductAttribute>
    implements OrderProductAttribute {
    public id?: number
    public order_id!: number
    public product_id!: number
    public status!: number
}
OrderProduct.init({
    id: {
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    },
    product_id: {
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    }, status: {
        type: DataType.TINYINT.UNSIGNED,
        defaultValue: 0,
        comment: "0: Unpaid, 1: Paid"
    }
}, {
    timestamps: true,
    paranoid: true,
    sequelize: DBConnection,
    tableName: "orderProduct"
})

export default OrderProduct;