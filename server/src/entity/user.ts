import { Model, Association } from "sequelize"
import { DataType } from "sequelize-typescript"
import dotenv from "dotenv"
import Store from "./store"
import DBConnection from "../models/mysql"

interface UserAttribute {
    id?: number
    username: string
    password: string
    auth?: number
}

class User extends Model<UserAttribute> 
implements UserAttribute{
    public id?: number
    public username!: string
    public password!: string
    public auth!: number
   
    public static associations: {
        id: Association<User, Store>;
    }
}

User.init(
    {
        id: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull:false
        },
        auth: {
            type: DataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
    },
    {
        timestamps: true,
        sequelize: DBConnection,
        tableName: "user"
    }
)

User.hasMany(Store, {
    sourceKey: "id",
    foreignKey: "user_id",
    onDelete: "SET NULL"
})

Store.belongsTo(User,{
    foreignKey: "user_id",
    targetKey: "id"
})


export default User;

