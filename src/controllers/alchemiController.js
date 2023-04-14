import { Alchemy, Network } from "alchemy-sdk"


export async function getNftsByWallet(req, res) {


    const { acccount } = req.query
    console.log("ceuanta")
    console.log(acccount)
    if(!acccount){
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
    console.log(process.env.ALCHEMY_API_KEY)

    const nftsFormated = nfts.ownedNfts.map((nfts) => {

        // console.log(nfts.contract)
        console.log(nfts)

    

        return {
            collection: nfts.contract.address,
            collectionType: nfts.contract.tokenType,
            tokenId: nfts.tokenId,
            rawMetadata: nfts.tokenUri,
            thumbnails:   nfts.media.map((media) => {
                return {
                    url: media.thumbnail,
                    format: media.format
                }
            }),
            nftName: nfts.title,
            nftType: nfts.tokenType,



        }
    })

    // console.log(nftsFormated)



    res.json({
        message: "estas en la ruta de alchemy",
        nfts: nftsFormated,
        ...(nfts.pageKey ? { pageKey: nfts.pageKey } : {})
    })
}