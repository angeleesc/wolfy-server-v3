import express from "express";
const routes = express.Router()
import { getNftsByWallet } from "../controllers/alchemiController.js";

routes.get("/",getNftsByWallet)

export default routes