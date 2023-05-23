import express from "express"
import { db } from "../firebase/admind.js"
import { GetAcutionOdersByBuyer, getBidsByorder, getFeaturesNftsForHero, getOrders, getOrdersByQuery, getOrdersByUser } from "../controllers/firebaseControllers.js"

const router = express.Router()


router.get("/", async (req, res) => {


    res.json({
        isSuccess: false,
        hasData: false,
        message: "estas en la ruta de lectura de base de datos"
    })
})

router.post("/orders-nfts", getOrders)

router.post("/orders-by-users", getOrdersByUser)

router.get("/oresers-bids/:id", GetAcutionOdersByBuyer)

router.get("/bids/:orderId", getBidsByorder )

router.get("/featured-nfts-hero", getFeaturesNftsForHero )

router.get("/orders-query", getOrdersByQuery )

export default router