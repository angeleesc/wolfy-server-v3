import express from "express"
const app = express();



app.get("/", (req, res)=>{
    res.send({
        message:"hola soy el servidor de wolfy"
    })
})


export default app