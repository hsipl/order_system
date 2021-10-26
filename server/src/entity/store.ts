import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import DBConnection from "../models/mysql";
import moment from "moment";

interface StoreAttribute {
  id?: number;
  name: string;
  type?: number;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

class Store extends Model<StoreAttribute> implements StoreAttribute {
  public id?: number;
  public name!: string;
  public type!: number;
  public status!: number;
  public createdAt?: string;
  public updatedAt?: string;
  public deletedAt?: string;
}

Store.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
    createdAt: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: moment().format("YYYY-MM-DD HH:mm:s"),
    },
    updatedAt: {
      type: DataType.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataType.STRING,
      allowNull: true,
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
