import express from "express";
const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        message: "estas en a ruta de subida de archivo"
    })
})

router.post("/", (req, res, next) => {

    

    const errorObjet = {}
    const validateSchema = {

    }

    next()

}, (req, res) => {


    console.log(req.files)
    console.log(req.body)

    res.status(200).json({
        message: "archivo subido"
    })


})

export default router;
