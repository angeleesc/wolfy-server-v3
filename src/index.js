import app from "./app.js"
import { config } from "dotenv"


const port = process.env.PORT || 5000

config()

app.listen(port, () => {
    console.log("servidor funcionado en el puerto", port)
})