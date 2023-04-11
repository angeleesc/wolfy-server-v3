import express from "express";
const routes = express.Router()

routes.get("/", (req, res) => {
    console.log("esta en la ruta de alchemy")
    console.log(process.env.ALCHEMY_API_KEY)
    res.json({
        message: "estas en la ruta de alchemy"
    })
})

export default routes