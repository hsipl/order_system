import { Model, Association } from "sequelize";
import { BelongsTo, DataType } from "sequelize-typescript";
import dotenv from "dotenv";
import Store from "./store";
import DBConnection from "../models/mysql";
import OrderProduct from "./orderProduct";
interface OrderAttribute {
    id?: number
    store_id?: number
    status?: number
}

class Order extends Model<OrderAttribute>
    implements OrderAttribute {
    public id?: number
    public store_id!: number
    public status!: number

}
Order.init(
    {
        id: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        store_id: {
            type: DataType.INTEGER.UNSIGNED,
            allowNull: false
        }, status: {
            type: DataType.TINYINT.UNSIGNED,
            defaultValue: 0,
            comment: "0: Unpaid, 1: Paid"
        }
    },
    {
        timestamps: true,
        paranoid: true,
        sequelize: DBConnection,
        tableName: "order"
    }
)
Store.hasMany(Order, {
    sourceKey: "id",
    foreignKey: "store_id",
})
Order.hasOne(OrderProduct, {
    sourceKey: "id",
    foreignKey: "order_id"
})
export default Order;