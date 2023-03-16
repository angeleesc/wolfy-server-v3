import express from "express"
const app = express();
import cors from "cors";
import fileUpload from "express-fileupload";
import ipfsRoutes from "./routes/ipfs.routes.js"

app.use(cors())
app.use(express.json());
app.use(
    fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/'
    })
  );
  
app.use("/api/v1/ipfs",ipfsRoutes)


app.get("/", (req, res)=>{
    res.send({
        message:"hola soy el servidor de wolfy"
    })
})


export default app