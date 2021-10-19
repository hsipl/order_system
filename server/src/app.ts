import express from "express"
import dotenv from "dotenv"
import path from "path"
import router from "./routes/route"
import DBConnect from "./models/mysql"
// create app class for server
export class App {
    private app:express.Application = express()

    constructor() {
        this.setEnvironment();
        this.setRoutes();
        this.setDBConnection();
    }

    private setEnvironment():void {
        dotenv.config({path:path.resolve(__dirname,"./.env")})
    }
    private setRoutes():void {
        for (let route of router) {
            this.app.use(`/api/${route.getPrefix()}`,route.getRouter())
        }
    }
    private setDBConnection():void {
        DBConnect.initDB()
    }
    public boot():void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on ${process.env.PORT}`);
        })
    }
} 
