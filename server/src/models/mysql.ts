import {
    Sequelize,
  } from 'sequelize';
import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.resolve(__dirname,"../.env")})

type envValue = string|undefined

class DBConnection {
    private username: envValue
    private password: envValue
    private host: envValue
    private port: envValue
    private db: envValue
    
    constructor() {
        if (process.env.MODE = "DEV") {
            this.username = process.env.DEV_USERNAME
            this.password = process.env.DEV_PASSWORD
            this.host = process.env.DEV_HOST
            this.port = process.env.DEV_PORT
            this.db = process.env.DEV_DB
        }else {
            this.username = process.env.USERNAME
            this.password = process.env.PASSWORD
            this.host = process.env.HOST
            this.port = process.env.PORT
            this.db = process.env.DB
        }
        
    }
    initDB(): Sequelize {
        try {
            const sequelize =  new Sequelize(`mysql://${this.username}:${this.password}@${this.host}:${this.port}/${this.db}`);
            return sequelize
        } catch (error) {
            console.error("Connect to MySQL failed, err:",error)
            throw new Error("Connect to MySQL failed")
        }
    }
}

export default new DBConnection().initDB()