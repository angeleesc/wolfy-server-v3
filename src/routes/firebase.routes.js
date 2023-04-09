import express from "express"
import { db } from "../firebase/admind.js"

const router = express.Router()


router.get("/", async (req, res) => {


    res.json({
        isSuccess: false,
        hasData: false,
        message: "estas en la ruta de lectura de base de datos"
    })
})

router.post("/orders-nfts", async (req, res) => {


    const orderRef = db.collection("orders").limit(40)

    const results = await orderRef.get()


    if (!results.empty) {

        const dataToResponse = []

        results.forEach((result) => {
            // console.log(result.data())

            dataToResponse.push({
                id: result.id,
                ...result.data()
            })

        })

        console.log(dataToResponse)


        res.json({
            isSuccess: true,
            hasData: true,
            orders: dataToResponse,
            lastReaf: results.docs[results.docs.length - 1].id
        })

        return

    }


    res.send({
        message: "estas en la ruta donde ordenes generales",
        isSuccess: false
    })

})

router.post("/orders-by-users", (req, res) => {

    res.send({
        message: "estas en la ruta de ordenes por usuario"
    })

})

export default router