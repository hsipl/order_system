import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import DBConnection from "../models/mysql";
interface OrderAttribute {
  id?: number;
  storeId?: number;
  status?: number;
}

class Order extends Model<OrderAttribute> implements OrderAttribute {
  public id?: number;
  public storeId!: number;
  public status!: number;
}
Order.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    storeId: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      field: "store_id",
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
    tableName: "order",
  }
);

export default Order;
