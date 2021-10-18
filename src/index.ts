import express,{Request,Response} from 'express';



const app = express()

app.use(express.json())

app.get("/healthcheck",(req: Request,res: Response) => {
    res.send("server is ok!")
})

app.listen(8080,()=> {
    console.log("Server is running on port:8080")
}  ) 