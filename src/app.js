import express from "express"
const app = express();
import cors from "cors";

app.use(cors())
app.get("/", (req, res)=>{
    res.send({
        message:"hola soy el servidor de wolfy"
    })
})


export default app