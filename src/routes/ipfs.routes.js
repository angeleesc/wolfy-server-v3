import express from "express";
import * as ipfsClient from 'ipfs-http-client'
import fs from "fs"


const router = express.Router()


router.get("/", (req, res) => {
    res.send({
        message: "estas en a ruta de subida de archivo"
    })
})

router.post("/", (req, res) => {

    const projetIpf = process.env.IPFS_PROJECT_ID
    const secretIpfsId = process.env.IPFS_KEY_SECRET
    const auth = 'Basic ' + Buffer.from(projetIpf + ':' + secretIpfsId).toString('base64')

    const client = ipfsClient.create(
        {
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
        }
    )



    const { file } = req.files
    // console.log("---file- reader----")
    // console.log(file)
    // console.log("fin xd")

    const fileReader = fs.createReadStream(file.tempFilePath)
    const fileNameFormated = file.name.replace(/ /g, "")
    console.log(fileNameFormated)



    // console.log(req.files)
    // console.log(req.body)

    res.status(200).json({
        message: "archivo subido"
    })


})

export default router;
