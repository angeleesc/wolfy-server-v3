import express from "express";
const routes = express.Router()
import { getFullNftData, getNftsByWallet } from "../controllers/alchemiController.js";

routes.get("/", getNftsByWallet)
routes.get("/nft", getFullNftData)

export default routes