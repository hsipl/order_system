import { Model } from "sequelize";
import DBConnection from "../models/mysql";
import { DataType } from "sequelize-typescript";
interface ProductTagAttribute {
  id?: number;
  productId?: number;
  tagId?: number;
  status?: number;
}

class ProductTag
  extends Model<ProductTagAttribute>
  implements ProductTagAttribute
{
  public id?: number;
  public productId?: number;
  public tagId?: number;
  public status!: number;
}

ProductTag.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      field: "product_id",
    },
    tagId: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      field: "tag_id",
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
    tableName: "productTag",
  }
);

export default ProductTag;
