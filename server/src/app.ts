import express from "express"
import dotenv from "dotenv"
import path from "path"
import { Sequelize } from "sequelize/types"
import router from "./routes/route"
import DBConnection from "./models/mysql"
import Migrater from "./entity/migrate"


// create app class for server
export class App {
    private app: express.Application = express()
    
    
    constructor() {
        this.setEnvironment();
        this.setRoutes();
        this.setDBConnection();
        this.setMigration()
    }

    private setEnvironment(): void {
        dotenv.config({path:path.resolve(__dirname,"./.env")})
    }

    private setRoutes(): void {
        for (let route of router) {
            this.app.use(`/api/${route.getPrefix()}`,route.getRouter())
        }
    }

    private async setDBConnection() {
        try {
            DBConnection.authenticate({logging:false})
            console.log("Connect to MySQL succeed");
        } catch (error) {
            throw new Error("MySQL test authentication failed.")
        }
        
    }

    private setMigration(): void {
        new Migrater().migrate()
    }

    public boot(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on ${process.env.PORT}`);
        })
    }
} 
