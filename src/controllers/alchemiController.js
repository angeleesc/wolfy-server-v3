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
    console.log("ceuanta")
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

        // console.log(nfts.title)
        // // console.log(nfts.media[0])

        // if (nfts.media[0].thumbnail) {
        //     console.log("tiene miniatura")
        // } else {
        //     console.log("no tiene miniatura")
        // }
        // if (nfts.media[0].gateway) {
        //     console.log("tiene enlace")
        // } else {
        //     console.log("no tiene enlace")
        // }



        // const dataToSent = {
        //     collection: nfts.contract.address,
        //     collectionType: nfts.contract.tokenType,
        //     tokenId: nfts.tokenId,
        //     rawMetadata: nfts.tokenUri,
        //     thumbnails: nfts.media.map((media) => {
        //         return {
        //             url: media.thumbnail ? media.thumbnail : media.gateway,
        //             format: media.format
        //         }
        //     }),
        //     nftName: nfts.title,
        //     nftType: nfts.tokenType,
        //     chainId: chainId.toString(),
        //     blockChainNetowork

        // }

        // console.log(dataToSent.thumbnails)

        // return dataToSent
    })

    // console.log(nftsFormated)



    res.json({
        message: "estas en la ruta de alchemy",
        nfts: nftsFormated,
        ...(nfts.pageKey ? { pageKey: nfts.pageKey } : {})
    })
}