import { Alchemy } from "alchemy-sdk";

export const getAlchemyNftData = async (nftsAddres, tokenId)=>{

    const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        // apiKey: process.env.ALCHEMY_API_KEY_ETH,
        network: Network.OPT_GOERLI,
        // network: Network.ETH_MAINNET
    };

    const alchemy = new Alchemy(settings);
    const allNftsData = await alchemy.nft.getNftMetadata(nftsAddres, tokenId)

    if (data.media && data.media.length > 0) {
        
    }



}