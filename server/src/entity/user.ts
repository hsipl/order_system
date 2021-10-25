import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import DBConnection from "../models/mysql";

interface UserAttribute {
  id?: number;
  username: string;
  password: string;
  storeID?: number;
  type?: number;
  status?: number;
}

class User extends Model<UserAttribute> implements UserAttribute {
  public id?: number;
  public username!: string;
  public password!: string;
  public storeID?: number;
  public type!: number;
  public status!: number;
}

User.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    password: {
      type: DataType.STRING(64),
      allowNull: false,
    },
    storeID: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      field: "store_id",
    },
    type: {
      type: DataType.TINYINT.UNSIGNED,
      defaultValue: 0,
      comment: "0: Normal Employee, 1: Store Manager ",
    },
    status: {
      type: DataType.TINYINT.UNSIGNED,
      defaultValue: 0,
      comment: "0: On-boarding, 1: Quit",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: DBConnection,
    tableName: "user",
  }
);

export default User;
