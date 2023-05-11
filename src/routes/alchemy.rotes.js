import express from "express";
const routes = express.Router()
import { getNftsByWallet } from "../controllers/alchemiController.js";

routes.get("/", getNftsByWallet)

routes.get("/nft", async (req, res) => {

    const { collection, id, tokenId } = req.query

    console.log(req.query)



    res.status(200).send({
        isSucces: true,
        message: "esta en la ruta donde obtiene todos lo detalles de la nft"
    })


})

export default routes