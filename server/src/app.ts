import express from "express"
import dotenv from "dotenv"
import path from "path"
import router from "./routes/route"
import DBConnection from "./models/mysql"
import { Sequelize } from "sequelize/types"
// create app class for server
export class App {
    private app: express.Application = express()
    private db: Promise<Sequelize>
    
    constructor() {
        this.setEnvironment();
        this.setRoutes();
        this.db = this.setDBConnection();
    }

    private setEnvironment(): void {
        dotenv.config({path:path.resolve(__dirname,"./.env")})
    }

    private setRoutes(): void {
        for (let route of router) {
            this.app.use(`/api/${route.getPrefix()}`,route.getRouter())
        }
    }

    private setDBConnection(): Promise<Sequelize> {
        return DBConnection.initDB()
        
    }

    public boot(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on ${process.env.PORT}`);
        })
    }
} 
