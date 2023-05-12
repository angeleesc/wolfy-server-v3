import { Alchemy, Network } from "alchemy-sdk"
import { AlchemyProvider, Network as EtherNerwork } from "ethers"


export async function getNftsByWallet(req, res) {


    // obtenemos el provider

    const provider = new AlchemyProvider("optimism-goerli", process.env.ALCHEMY_API_KEY);

    const netWotData = await provider.getNetwork()
    console.log(netWotData.chainId)
    console.log(netWotData.name)

    const chainId = netWotData.chainId;
    const blockChainNetowork = netWotData.name




    const { acccount } = req.query
    console.log("cuenta")
    console.log(acccount)
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

export async function getFullNftData(req, res) {

    const { collection, id, tokenId } = req.query

    console.log(req.query)

    const settings = {
        // apiKey: process.env.ALCHEMY_API_KEY,
        apiKey: process.env.ALCHEMY_API_KEY_ETH,
        // network: Network.OPT_GOERLI,
        network: Network.ETH_MAINNET
    };

    const alchemy = new Alchemy(settings);

    if (collection != "none" && tokenId != "none") {
        const data = await alchemy.nft.getNftMetadata(collection, tokenId)
        console.log("metadata obtenida")
        console.log(data)
    }



    return res.status(200).send({
        isSucces: true,
        message: "esta en la ruta donde obtiene todos lo detalles de la nft"
    })


}