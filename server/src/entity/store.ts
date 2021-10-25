import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import DBConnection from "../models/mysql";

interface StoreAttribute {
  id?: number;
  name: string;
  type?: number;
  status?: number;
}

class Store extends Model<StoreAttribute> implements StoreAttribute {
  public id?: number;
  public name!: string;
  public type!: number;
  public status!: number;
}

Store.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      onDelete: "cascade",
    },
    name: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    type: {
      type: DataType.TINYINT.UNSIGNED,
      defaultValue: 0,
      comment: "0: Branch Store, 1: Head Store",
    },
    status: {
      type: DataType.TINYINT.UNSIGNED,
      defaultValue: 0,
      comment: "0: Opening, 1: Closing",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: DBConnection,
    tableName: "store",
  }
);

export default Store;