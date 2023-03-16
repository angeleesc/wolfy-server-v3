import express from "express"
const app = express();
import cors from "cors";
import fileUpload from "express-fileupload";

app.use(cors())
app.use(express.json());
app.use(
    fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/'
    })
  );
  


app.get("/", (req, res)=>{
    res.send({
        message:"hola soy el servidor de wolfy"
    })
})


export default app