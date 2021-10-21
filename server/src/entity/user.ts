import { Model, Association } from "sequelize"
import { DataType } from "sequelize-typescript"
import dotenv from "dotenv"
import Store from "./store"
import DBConnection from "../models/mysql"

interface UserAttribute {
    id?: number
    username: string
    password: string
    store_id?: number
    type?: number
    status?: number
}

class User extends Model<UserAttribute> 
implements UserAttribute{
    public id?: number
    public username!: string
    public password!: string
    public store_id?: number
    public type!: number
    public status!: number
   
    public static associations: {
        id: Association<User, Store>;
    }
}

User.init(
    {
        id: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataType.STRING(64),
            allowNull: false
        },
        password: {
            type: DataType.STRING(64),
            allowNull:false
        },
        store_id: {
            type: DataType.INTEGER.UNSIGNED,
            allowNull: false
        },
        type: {
            type: DataType.TINYINT.UNSIGNED,
            defaultValue: 0,
            comment: "0: Normal Employee, 1: Store Manager " 
        },
        status: {
            type: DataType.TINYINT.UNSIGNED,
            defaultValue: 0,
            comment: "0: On-boarding, 1: Quit"
        },
    },
    {
        timestamps: true,
        paranoid: true,
        sequelize: DBConnection,
        tableName: "user"
    }
)

export default User;

