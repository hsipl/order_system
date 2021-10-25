import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import DBConnection from "../models/mysql";
interface TagAttribute {
  id?: number;
  tag?: string;
  status?: number;
}

class Tag extends Model<TagAttribute> implements TagAttribute {
  public id?: number;
  public tag!: string;
  public status?: number;
}

Tag.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tag: {
      type: DataType.STRING(70),
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
    tableName: "tag",
  }
);
export default Tag;
