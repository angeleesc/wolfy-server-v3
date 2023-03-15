import express from "express";
const router = express.Router()

router.get("/",(req, res)=>{
res.send({
    message:"estas en a ruta de subida de archivo"
})
})

export default router;
