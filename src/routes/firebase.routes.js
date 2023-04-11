import express from "express"
import { db } from "../firebase/admind.js"
import { getOrders } from "../controllers/firebaseControllers.js"

const router = express.Router()


router.get("/", async (req, res) => {


    res.json({
        isSuccess: false,
        hasData: false,
        message: "estas en la ruta de lectura de base de datos"
    })
})

router.post("/orders-nfts", getOrders )

router.post("/orders-by-users", (req, res) => {

    const { user, fillter } = req.body

    if(!user) {

        res.status(500).send({
            message: "lo siento pero el nopmbre de usuario es requerido"
        })

        return

    }

    res.send({
        message: "estas en la ruta de ordenes por usuario"
    })

})

export default router