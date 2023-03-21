import express from "express";
import * as ipfsClient from "ipfs-http-client";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "estas en a ruta de subida de archivo",
  });
});

router.post(
  "/",
  (req, res, next) => {
    // adatacion de los formatos de la metadata

    if (req.body.nftsAtributes) {
      let formatedAtributes = JSON.parse(req.body.nftsAtributes);
      let atributesMetada = formatedAtributes.map((atribute) => ({
        trait_type: atribute.key,
        value: atribute.nftValue,
        ...(atribute.display ? { display_type: atribute.displayType } : {}),
      }));

      req.body.nftsAtributes = atributesMetada;
    }

    // verificar si el tipo de la imagen es una imagen o es un video
    console.log(req.files);
    console.log(req.files.file.mimetype);

    if (req.files.file.mimetype.indexOf("image") !== -1) {
      //   console.log("es una imagen");
      req.body.fileType = "image";
    } else if (req.files.file.mimetype.indexOf("video") !== -1) {
      //   console.log("es un video");
      req.body.fileType = "video";
    } else {
      req.body.fileType = "unknow";
    }

    next();
  },
  async (req, res) => {
    const projetIpf = process.env.IPFS_PROJECT_ID;
    const secretIpfsId = process.env.IPFS_KEY_SECRET;
    const auth =
      "Basic " + Buffer.from(projetIpf + ":" + secretIpfsId).toString("base64");

    const client = ipfsClient.create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    const { file } = req.files;

    const fileReader = fs.createReadStream(file.tempFilePath);
    const fileNameFormated = file.name.replace(/ /g, "");
    console.log(fileNameFormated);

    try {
      const fileAdded = await client.add(fileReader);
      console.log("subida exitosa");
      console.log(fileAdded);
      console.log(req.body);

      // si se creo con exito entonces  creamos la netadata
      const filePath = {
        ...(req.body.fileType === "image"
          ? {
              image: `ipfs://${fileAdded.path}`,
            }
          : req.body.fileType === "video"
          ? {
              animation_url: `ipfs://${fileAdded.path}`,
            }
          : {}),
      };

      console.log(filePath);

      const metadata = {
        name: req.body.nftName,
        description: req.body.nftDescription,
        ...(req.body.nftsAtributes
          ? { attributes: req.body.nftsAtributes }
          : {}),
        ...filePath,
        ...(req.body.nftUrlPage? {
          "external_url": req.body.nftUrlPage
        }:{}),
        ...(req.body.youtubeUrl? {
          "youtube_url": req.body.youtubeUrl,
        }:{}),

      };
      // console.log("metadata----")

      // console.log(metadata)
      // console.log("--------")

      return res.status(200).json({
        message: "operacion exitosa",
      });
    } catch (error) {
      console.log("ocurrion un error");
      console.log(error);

      res.status(500).json({
        message:
          "lo sinento pero susedi un error durante la subida de archivos",
      });
    }

    res.status(200).json({
      message: "no se hizo nada con el archivo",
    });
  }
);

export default router;
