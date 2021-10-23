import { Model, Association } from "sequelize";
import DBConnection from "../models/mysql";
import { BelongsTo, DataType } from "sequelize-typescript";
interface ProductTagAttribute {
    id?: number
    product_id?: number
    tag_id?: number
    status?: number
}

class ProductTag extends Model < ProductTagAttribute > implements ProductTagAttribute{
    public id?: number
    public product_id?: number
    public tag_id?: number
    public status!: number


}

ProductTag.init({
    id:{
        type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
    },
    product_id: {
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    },
    tag_id: {
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    }, status: {
        type: DataType.TINYINT.UNSIGNED,
        defaultValue: 0
    }
},
{
    timestamps: true,
    paranoid: true,
    sequelize: DBConnection,
    tableName: "productTag"
})

export default ProductTag;