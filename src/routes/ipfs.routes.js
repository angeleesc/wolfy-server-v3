import express from "express";
import * as ipfsClient from 'ipfs-http-client'
import fs from "fs"


const router = express.Router()


router.get("/", (req, res) => {
    res.send({
        message: "estas en a ruta de subida de archivo"
    })
})

router.post("/", (req, res, next) => {

    // adatacion de los formatos de la metadata

    if (req.body.nftsAtributes) {

        let formatedAtributes = JSON.parse(req.body.nftsAtributes);
        let atributesMetada = formatedAtributes.map(atribute => ({
            "trait_type": atribute.key,
            value: atribute.nftValue,
            ...(atribute.display ? { "display_type": atribute.displayType } : {})

        }))

        req.body.nftsAtributes = atributesMetada
    }

    // verificar si el tipo de la imagen es una imagen o es un video
    console.log (req.files);

    if(req.files.mimetype){
        
    }


    next()
}, async (req, res) => {

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


    const fileReader = fs.createReadStream(file.tempFilePath)
    const fileNameFormated = file.name.replace(/ /g, "")
    console.log(fileNameFormated)

    try {
        const fileAdded = await client.add(fileReader);
        console.log("subida exitosa")
        console.log(fileAdded)
        console.log(req.body)




        

        // si se creo con exito entonces  creamos la netadata

        const  metadata = {

            name: req.body.nftName,
            description: req.body.nftDescription,
            ...(req.body.nftsAtributes? {attributes: req.body.nftsAtributes}: {}),
     
            



        }


        return res.status(200).json({
            message: "operacion exitosa",
        })

    } catch (error) {
        console.log("ocurrion un error")
        console.log(error)

        res.status(500).json({
            message: "lo sinento pero susedi un error durante la subida de archivos"
        })
    }




    res.status(200).json({
        message: "no se hizo nada con el archivo"
    })


})

export default router;
