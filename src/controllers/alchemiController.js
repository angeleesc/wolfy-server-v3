import { Alchemy, Network } from "alchemy-sdk"
import { AlchemyProvider, Network as EtherNerwork, Wallet, ethers } from "ethers"
import ERC721UUPSabi from "../abis/ERC721UUPS.js"
import { db } from "../firebase/admind.js"


export async function connectErc721Contrac(provider, contractAdress) {
    let wallet = Wallet.fromPhrase(process.env.MNEMONIC)
    wallet = wallet.connect(provider)
    const contract = new ethers.Contract(contractAdress, ERC721UUPSabi, wallet)
    return contract
}


export async function getNftsByWallet(req, res) {
    // obtenemos el provider

    const provider = new AlchemyProvider("optimism-goerli", process.env.ALCHEMY_API_KEY);


    const netWotData = await provider.getNetwork()
    // console.log(netWotData.chainId)
    // console.log(netWotData.name)

    const chainId = netWotData.chainId;
    const blockChainNetowork = netWotData.name

    const { acccount } = req.query
    // console.log("cuenta")
    // console.log(acccount)
    if (!acccount) {
        console.log("lo siento pero cuenta es requerid")
        res.status(500).json({
            message: "los siento pero el nombre de la cuenta es requerida"
        })
    }


    const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.OPT_GOERLI,
    };


    const alchemy = new Alchemy(settings);

    const nfts = await alchemy.nft.getNftsForOwner(acccount, {
        // pageSize: 10
    });
    // console.log(nfts)
    // nfts.ownedNfts.forEach





    console.log("esta en la ruta de alchemy")
    // console.log(process.env.ALCHEMY_API_KEY)

    // console.log(nfts.blockHash)
    // console.log("resultado")
    // console.log(nfts)
    // console.log("---------------")



    const nftsFormated = []

    nfts.ownedNfts.forEach((nfts) => {

        if (nfts.media && nfts.media.length > 0) {
            // console.log("titulos")
            // console.log(nfts.title)
            // console.log("tiene media")
            // console.log(nfts)

            const dataToSent = {
                collection: nfts.contract.address,
                collectionType: nfts.contract.tokenType,
                tokenId: nfts.tokenId,
                rawMetadata: nfts.tokenUri,
                thumbnails: nfts.media.map((media) => {
                    return {
                        url: media.thumbnail ? media.thumbnail : media.gateway,
                        format: media.format
                    }
                }),
                nftName: nfts.title,
                nftType: nfts.tokenType,
                chainId: chainId.toString(),
                blockChainNetowork

            }

            // console.log(nfts.title)
            // console.log(dataToSent.thumbnails)

            nftsFormated.push(dataToSent)

            // console.log(dataToSent.thumbnails)

        } else {
            console.log("no tiene media")
        }

    })





    res.json({
        message: "estas en la ruta de alchemy",
        nfts: nftsFormated,
        ...(nfts.pageKey ? { pageKey: nfts.pageKey } : {})
    })
}

let dataToSend = {}

export async function getFullNftData(req, res) {

    const { collection, id, tokenId } = req.query



    // const 
    // const provider = new ethers.JsonRpcApiProvider(process.env.ALCHEMY_PROVIDER_HTTP )

    console.log(req.query)

    const settings = {
        // apiKey: process.env.ALCHEMY_API_KEY,
        apiKey: process.env.ALCHEMY_API_KEY_ETH,
        // network: Network.OPT_GOERLI,
        network: Network.ETH_MAINNET
    };


    const alchemy = new Alchemy(settings);
    const dataToSend = {}

    // obtenemos lo datos de la nft

    if (collection != "none" && tokenId != "none") {


        const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_MAINET_EHT_PROVIDER)
        const erc721Contract = await connectErc721Contrac(provider, collection)

        const data = await alchemy.nft.getNftMetadata(collection, tokenId)
        // console.log("metadata obtenida")
        // console.log(data)

        // verificamos si hay datos

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






            console.log("datos extraidos")
            // console.log(data)
            dataToSend.metaData = multimediaData

        }


        let collectionData = {}

        // console.log(data.contract.openSea)

        if (data.contract.openSea && Object.keys(data.contract.openSea).length > 0) {
            // console.log("hay datos de opensea")
            // floorPrice
            // collectionName
            // safelistRequestStatus
            // imageUrl
            // description
            // externalUrl
            // twitterUsername
            // lastIngestedAt:


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


        const symbol = await erc721Contract.symbol()
        const colectionName = await erc721Contract.name()


        if (!collectionData.collectionName) {
            collectionData.collectionName = colectionName
        }

        collectionData.symbol = symbol
        dataToSend.collectionData = collectionData


    }

    if (id) {
        const orderRef = db.collection("orders").doc(id)
        const result = await orderRef.get()
        if (result.exists) {
            const orderData = {
                ...result.data
            }

            dataToSend.orderData = orderData
        }

    }


    console.log("datos para enviar")
    console.log(dataToSend)




    // obtenemos los datos de la collecion

    // const porvider = new ethers.JsonRpcProvider()


    return res.status(200).send({
        isSucces: true,
        message: "esta en la ruta donde obtiene todos lo detalles de la nft"
    })


}