import { Alchemy, Network } from "alchemy-sdk"


export async function getNftsByWallet(req, res) {


    const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.OPT_GOERLI,
    };


    const alchemy = new Alchemy(settings);

    const nfts = await alchemy.nft.getNftsForOwner("0x23b057357893Fb958571f81197823D6B1e84d64f", {
        pageSize: 10
    });
    // console.log(nfts)


    console.log("esta en la ruta de alchemy")
    console.log(process.env.ALCHEMY_API_KEY)

    const nftsFormated = nfts.ownedNfts.map((nfts) => {
        return {
            collection: nfts.contract.address,
            collectionType: nfts.contract.tokenType,
            tokenId: nfts.tokenId,
            rawMetadata: nfts.tokenUri,
            thumbnails: nfts.media.map((media) => {
                return {
                    thumbnail: media.thumbnail,
                    format: media.format
                }


            })
        }
    })

    console.log(nftsFormated)



    res.json({
        message: "estas en la ruta de alchemy",
        nfts: nftsFormated,
        ...(nfts.pageKey ? { pageKey: nfts.pageKey } : {})
    })
}