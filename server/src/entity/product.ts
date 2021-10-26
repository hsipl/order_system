import { Model, DataTypes } from "sequelize";
import { DataType } from "sequelize-typescript";
import DBConnection from "../models/mysql";
interface ProductAttribute {
  id?: number;
  storeId?: number;
  name?: string;
  money?: number;
  option?: string;
  description?: string;
  status?: number;
}

class Product extends Model<ProductAttribute> implements ProductAttribute {
  public id?: number;
  public storeId?: number;
  public name!: string;
  public money!: number;
  public option?: string;
  public description?: string;
  public status!: number;
}

Product.init(
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
    name: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    money: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    option: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(128),
      allowNull: false,
    },
    status: {
      type: DataType.TINYINT.UNSIGNED,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: DBConnection,
    tableName: "product",
  }
);

export default Product;
