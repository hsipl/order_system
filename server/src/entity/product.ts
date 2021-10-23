import { Model, Association, DataTypes } from "sequelize"
import { BelongsTo, DataType } from "sequelize-typescript"
import DBConnection from "../models/mysql"
import OrderProduct from "./orderProduct";
import ProductTag from "./ProductTag"
interface ProductAttribute {
    id?: number
    store_id?: number
    name?: string
    money?: number
    option?: string
    description?: string
    status?: number
}

class Product extends Model<ProductAttribute> implements ProductAttribute {
    public id?: number
    public store_id?: number
    public name!: string
    public money!: number
    public option?: string
    public description?: string
    public status!: number
}

Product.init({
    id: {
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    store_id: {
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    },
    name: {
        type: DataType.STRING(64),
        allowNull: false
    },
    money: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    option: {
        type: DataType.STRING(64),
        allowNull: false
    }, description: {
        type: DataType.STRING(128),
        allowNull: false
    },
    status: {
        type: DataType.TINYINT.UNSIGNED,
        defaultValue: 0
    }
},
    {
        timestamps: true,
        paranoid: true,
        sequelize: DBConnection,
        tableName: "product"
    }
)

Product.hasOne(OrderProduct, {
    sourceKey: "id",
    foreignKey: "product_id",
})
Product.hasOne(ProductTag,{
    sourceKey: "id",
    foreignKey: "product_id",
})
export default Product;