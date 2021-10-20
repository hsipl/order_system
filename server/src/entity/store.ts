import { Model, Association } from "sequelize"
import { DataType } from "sequelize-typescript"
import User from "./user"
import DBConnection from "../models/mysql"

interface StoreAttribute {
    id?: number
    user_id: number
    name: string
    auth: number
    
}

class Store extends Model<StoreAttribute> 
implements StoreAttribute{
    public id?: number
    public user_id!: number
    public name!: string
    public auth!: number

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
        user_id: {
            type: DataType.INTEGER.UNSIGNED,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull:false
        },
        auth: {
            type: DataType.TINYINT.UNSIGNED,
            defaultValue: 0
        }
    },
    {
        timestamps: true,
        sequelize: DBConnection.initDB()
    }
)

Store.hasOne(User, {
    sourceKey:"user_id",
    foreignKey:"id"
})

export default Store;