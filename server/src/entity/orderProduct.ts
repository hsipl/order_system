import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import DBConnection from "../models/mysql";
interface OrderProductAttribute {
  id?: number;
  orderId?: number;
  productId?: number;
  status?: number;
}
class OrderProduct
  extends Model<OrderProductAttribute>
  implements OrderProductAttribute
{
  public id?: number;
  public orderId!: number;
  public productId!: number;
  public status!: number;
}
OrderProduct.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      field: "order_id",
    },
    productId: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      field: "product_id",
    },
    status: {
      type: DataType.TINYINT.UNSIGNED,
      defaultValue: 0,
      comment: "0: Unpaid, 1: Paid",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: DBConnection,
    tableName: "orderProduct",
  }
);
export default OrderProduct;
