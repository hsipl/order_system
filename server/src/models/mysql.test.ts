import DBConnect from "./mysql"
import dotenv from "dotenv"
import path from "path"
import { Sequelize } from "sequelize/types"

dotenv.config({path:path.resolve(__dirname,"../.env")})

// Not found a solution to mock db
test("DB init success", async() => {
    const DB = DBConnect.initDB()
    
})