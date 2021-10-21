import { Model, Association } from "sequelize"
import { BelongsTo, DataType } from "sequelize-typescript"
import dotenv from "dotenv"
import User from "./user"
import DBConnection from "../models/mysql"

interface StoreAttribute {
    id?: number
    name: string
    type?: number
    status?: number
}

class Store extends Model<StoreAttribute> 
implements StoreAttribute{
    public id?: number
    public name!: string
    public type!: number
    public status!: number

    public static associations: {
        user_id: Association<Store, User>;
    }
}

Store.init(
    {
        id: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING(64),
            allowNull:false
        },
        type: {
            type: DataType.TINYINT.UNSIGNED,
            defaultValue: 0,
            comment: "0: Branch Store, 1: Head Store"
        },
        status: {
            type: DataType.TINYINT.UNSIGNED,
            defaultValue: 0,
            comment: "0: Opening, 1: Closing"
        }
    },
    {
        timestamps: true,
        paranoid: true,
        sequelize: DBConnection,
        tableName: "store"
    }
)

Store.hasMany(User,{
    sourceKey: "id",
    foreignKey: "store_id",
})

export default Store;