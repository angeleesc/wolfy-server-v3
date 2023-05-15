import { Alchemy, Network } from "alchemy-sdk"
import { AlchemyProvider, Network as EtherNerwork, Wallet, ethers } from "ethers"
import ERC721UUPSabi from "../abis/ERC721UUPS.js"
import { db } from "../firebase/admind.js"
import { saleMethod as saleMethodOp, smartContracts } from "../helpers/global-constants.js"
import auctionAbi from "../abis/auction.js"
import marketAbI from "../abis/marketplace.js"
import { getAlchemyNftDataServices } from "../services/alchemyServices.js"

export async function connectErc721Contrac(provider, contractAdress) {
    let wallet = Wallet.fromPhrase(process.env.MNEMONIC)
    wallet = wallet.connect(provider)
    const contract = new ethers.Contract(contractAdress, ERC721UUPSabi, wallet)
    return contract
}

export async function conectAuctionContrac(provider) {
    let wallet = Wallet.fromPhrase(process.env.MNEMONIC)
    wallet = wallet.connect(provider)
    const contract = new ethers.Contract(smartContracts.Auction, auctionAbi, wallet)
    return contract
}

export async function conectMakertContrac(provider) {
    let wallet = Wallet.fromPhrase(process.env.MNEMONIC)
    wallet = wallet.connect(provider)
    const contract = new ethers.Contract(smartContracts.market, marketAbI, wallet)
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

    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_PROVIDER_HTTP)


    const { collection, id, tokenId } = req.query
    // console.log(req.query)

    if (id && id != "nfts") {

        console.log("obteniendo los dato desde la base de datos")

        const orderInDbRef = db.collection("orders").doc(id)
        const orderResult = await orderInDbRef.get()

        if (!orderResult.exists) {

            res.status(200).json({
                isSucces: true,
                hasData: false,
                message: "No exite esta orden en la base de datos"
            })
            return

        }

        const { blockChain,
            chainId, colection, colectionName, colectionSymbol, currentPrice, endTime, initPrice, metadata, onSale, orderId, price, saleMethod, seller, bestBidder } = orderResult.data()

        dataToSend.onSale = orderId
        dataToSend.price = currentPrice ? currentPrice : price
        dataToSend.quantity = onSale
        dataToSend.seller = seller,
            dataToSend.saleMethod = saleMethod
        dataToSend.chainId = chainId



        let tokenId

        if (saleMethod === saleMethodOp.auction) {
            const contract = await conectAuctionContrac(provider)
            const ethOrderData = await contract.auctions(orderId)

            console.log("orden obtenenida desde el contrato inteligente")
            // console.log(ethOrderData)
            const {
                tokenId: ethTokenId,
            } = ethOrderData
            console.log("tokenId de referencia :", ethTokenId.toString())
            tokenId = ethTokenId

            const alchemyData = await getAlchemyNftDataServices(colection, tokenId)

            let metadataToSend


            if (alchemyData.isSucces) {
                metadataToSend = {
                    ...alchemyData.data
                }
                dataToSend.alchemyMetada = metadataToSend
            }


            console.log("finalza")

            console.log(endTime)

            if (metadataToSend) dataToSend.alchemyMetada = metadataToSend
            if (bestBidder) dataToSend.bestBidder = bestBidder
            dataToSend.endTime = endTime._seconds * 1000
            dataToSend.colectionName = colectionName
            dataToSend.colectionName = colectionSymbol
            dataToSend.metadata = metadata
            dataToSend.chainId = chainId
            dataToSend.blockChain = blockChain
            dataToSend.bestBidder = bestBidder,


                res.status(200).json(
                    {
                        isSucces: true,
                        hasData: true,
                        ...dataToSend
                    }
                )
            return



        } else if (saleMethod === saleMethodOp.sales) {
            const contract = await conectMakertContrac(provider)
            const ethOrderData = await contract.getOrder(orderId)
            // console.log(ethOrderData)

            const { tokenID } = ethOrderData

            console.log("token id de la venta")
            console.log(tokenID[0].toString())

            const alchemyData = await getAlchemyNftDataServices(colection, tokenID[0].toString())

            console.log("datos obtenidos desde alchemy")
            console.log(alchemyData)

            dataToSend.tokenId = tokenID[0].toString()

            let metadataToSend

            if (alchemyData.isSucces) {
                metadataToSend = {
                    ...alchemyData.data
                }

            }

            if (metadataToSend) dataToSend.alchemyMetada = metadataToSend
            dataToSend.colectionName = colectionName
            dataToSend.colectionName = colectionSymbol
            dataToSend.metadata = metadata
            dataToSend.chainId = chainId
            dataToSend.blockChain = blockChain


            res.status(200).json(
                dataToSend
            )
            return



        }




    } else if (collection != "none" && tokenId != "none") {

        console.log("obteniendo los dastos desde la collecion y el toke id")



    }


    console.log("datos a enviar")
    console.log(dataToSend)


    return res.status(200).send({
        isSucces: true,
        message: "esta en la ruta donde obtiene todos lo detalles de la nft",
    })


}