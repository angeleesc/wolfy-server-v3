import { Alchemy, Network } from "alchemy-sdk";
import { db } from "../firebase/admind.js";

export const getAlchemyNftDataServices = async (nftsAddres, tokenId) => {

    const dataToSend = {}

    const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        // apiKey: process.env.ALCHEMY_API_KEY_ETH,
        network: Network.OPT_GOERLI,
        // network: Network.ETH_MAINNET
    };

    const alchemy = new Alchemy(settings);

    try {

        const data = await alchemy.nft.getNftMetadata(nftsAddres, tokenId)

        if (data.media && data.media.length > 0) {

            let multimediaData = {
                image: data.media[0].gateway,

            }

            if (data.rawMetadata) {

                multimediaData = {
                    ...multimediaData,
                    ...(data.rawMetadata.attributes ? { attributes: data.rawMetadata.attributes } : {}),
                    ...(data.rawMetadata.name ? { name: data.rawMetadata.name } : {}),
                    ...(data.rawMetadata.description ? { description: data.rawMetadata.description } : {}),
                    ...(data.rawMetadata.external_url ? { "external_ur": data.rawMetadata.external_url } : {}),
                }



            }

            let collectionData = {}

            if (data.contract.openSea && Object.keys(data.contract.openSea).length > 0) {


                collectionData = {
                    ...(data.contract.openSea.floorPrice ? { floorPrice: data.contract.openSea.floorPrice } : {}),
                    ...(data.contract.openSea.collectionName ? { collectionName: data.contract.openSea.collectionName } : {}),
                    ...(data.contract.openSea.safelistRequestStatus ? { colectionName: data.contract.openSea.safelistRequestStatus } : {}),
                    ...(data.contract.openSea.imageUrl ? { imageUrl: data.contract.openSea.imageUrl } : {}),
                    ...(data.contract.openSea.description ? { description: data.contract.openSea.description } : {}),
                    ...(data.contract.openSea.externalUrl ? { externalUrl: data.contract.openSea.externalUrl } : {}),
                    ...(data.contract.openSea.discordUrl ? { discordUrl: data.contract.openSea.discordUrl } : {}),
                    ...(data.contract.openSea.twitterUsername ? { twitterUsername: data.contract.openSea.twitterUsername } : {}),
                    ...(data.contract.openSea.lastIngestedAt ? { lastIngestedAt: data.contract.openSea.lastIngestedAt } : {})
                }
            }

            if (Object.keys(multimediaData).length > 0) {

                dataToSend.multimediaData = multimediaData
            }

            if (Object.keys(collectionData).length > 0) {
                dataToSend.collectionData = collectionData
            }



        }

        if (Object.keys(dataToSend).length > 0) return { isSucces: true, hasData: true, data: dataToSend }
        return {
            isSucces: true,
            hasData: false
        }



    } catch (error) {

        console.log(error)

        const errosRef = db.collection("erros").doc()

        await errosRef.set({
            message: error.message ? error.message : "ocurrio un error consultado datos en alchemy",
            params: {
                nftsAddres: nftsAddres ? nftsAddres : "nulo",
                tokenId: tokenId ? tokenId : "nulo"
            }
        })

        return {
            isSucces: false
        }

    }


}