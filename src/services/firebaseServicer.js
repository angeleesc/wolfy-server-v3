import { db } from "../firebase/admind.js"
import { saleMethod } from "../helpers/global-constants.js"

export const getOrdersServeces = async (fillter, wallet) => {


    const orderRef = db.collection("orders").limit(40)
    const results = await orderRef.get()


    try {
        if (!results.empty) {
            const dataToResponse = []
            results.forEach((result) => {




                dataToResponse.push({
                    id: result.id,
                    ...result.data()
                })






            })

            return {
                isSuccess: true,
                dataToResponse,
                lastRef: results.docs[results.docs.length - 1].id
            }
        }

        return {
            isSuccess: false,
            reason: "not result"
        }
    } catch (error) {
        return {
            isSuccess: false,
            reason: "firebase error"
        }

    }




}


export const getOrdersByUserServices = async (wallet, fillter) => {

    const orderUserRef = db.collection("users").doc(wallet).collection("orders")

    try {
        const orderResult = await orderUserRef.get()

        if (!orderResult.empty) {
            const orders = []

            orderResult.forEach((order) => {
                console.log(order.data())

                const { seller } = order.data()

                // console.log(seller)

                orders.push({
                    ...order.data(),
                    id: order.id,
                })
            })

            return {
                isSuccess: true,
                hasData: true,
                orders,
                lastRef: orderResult.docs[orderResult.docs.length - 1].id
            }

        }

        return {
            isSuccess: true,
            hasData: false
        }

    } catch (error) {

        return { isSuccess: false }

    }

}

export const GetAcutionOdersByBuyerServicer = async (id) => {

    const buyerOrdersQuery = db.collection("users").doc(id).collection("orders-bid")

    try {

        const buyersOrdersResults = await buyerOrdersQuery.get()

        if (!buyersOrdersResults.empty) {

            const dataToSend = []

            buyersOrdersResults.forEach(buyerOrder => {

                dataToSend.push({
                    ...buyerOrder.data(),
                    idDb: buyerOrder.id

                })

            })

            console.log("dataos a enviar")

            console.log(dataToSend)

            return {
                isSuccess: true,
                hasData: true,
                orders: dataToSend
            }

        }


        return {
            isSuccess: true,
            hasData: false
        }

    } catch (error) {
        return {
            isSuccess: false
        }

    }



}

export const getBisdServices = async (orderId) => {

    const bidRef = db.collection("orders").doc(orderId).collection("bidders").orderBy("bid", "desc").limit(10)

    try {
        const result = await bidRef.get()

        if (!result.empty) {

            const dataToSend = []

            result.forEach((bidder) => {

                dataToSend.push({
                    ...bidder.data()
                })

            })

            return {
                isSuccess: true,
                hasData: true,
                bidders: dataToSend
            }

        } else {
            console.log("esta vacio")
        }

        return {
            isSuccess: true,
            hasData: false
        }



    } catch (error) {

        return {
            isSuccess: false,
            errorMessage: "ocurio un erro mientra consutamos en la base de datos"
        }

    }


}

export const getFeaturesNftsForHeroSevrices = async () => {

    const dataTosend = []
    const currentime = new Date()

    const topAuctionRef = db.collection("orders").where("endTime", ">=", currentime).orderBy("endTime", "desc").limit(1)
    const auctionREsult = await topAuctionRef.get()
    if (!auctionREsult.empty) {
        dataTosend.push({
            type: "nft",
            ...auctionREsult.docs[0].data(),
            adsMessage: "No te pierdas la opotunidad, has tu mejor oferta"

        })
    }

    const highestPriceRef = db.collection("orders").where("saleMethod", "==", saleMethod.sales).orderBy("price", "desc").limit(1)
    const hisghtestReasul = await highestPriceRef.get()
    if (!hisghtestReasul.empty) {
        dataTosend.push({
            type: "nft",
            ...hisghtestReasul.docs[0].data(),
            adsMessage: "La Nft MAs esclusiva puede ser para ti"
        })
    }

    const lowestPriceRef = db.collection("orders").where("saleMethod", "==", saleMethod.sales).orderBy("price", "asc").limit(1)
    const lowerPriceRsult = await lowestPriceRef.get()
    if (!lowerPriceRsult.empty) {
        dataTosend.push({
            type: "nft",
            ...lowerPriceRsult.docs[0].data(),
            adsMessage: "Iniciate en el mundo de la nft con esta oferta"
        })
    }

    const newEstOrderRef = db.collection("orders").orderBy("listingAt", "desc").limit(1)
    const newEstOrderResult = await newEstOrderRef.get()

    if (!newEstOrderResult.empty) {
        dataTosend.push({
            type: "nft",
            ...newEstOrderResult.docs[0].data(),
            adsMessage: "Compra esta nft antes que lo demas"
        })
    }

    const oldestOrderRef = db.collection("orders").orderBy("listingAt", "asc").limit(1)
    const oldestOrderREsult = await oldestOrderRef.get()


    if (!oldestOrderREsult.empty) {
        dataTosend.push({
            type: "nft",
            ...oldestOrderREsult.docs[0].data(),
            adsMessage: "Aun estas a tiempo de comprarla"


        })
    }


    console.log("datos para enviar")
    console.log(dataTosend)

    return dataTosend

}

export const getOrdersByQueryServices = async (raWQuery) => {

    // formateamos el archivo recibido en json

    const query = JSON.parse(raWQuery.query)


    console.log("se obtuvo")
    // console.log(query)


    let ordersQuery = db.collection("orders")

    query.forEach(params => {

        console.log(params)

        console.log("queru a evaluar")

        if (params.type === "where") {
            const { index, operator, value, valueType } = params

            let valueParams = value

            if (valueType === "date") {
                valueParams = new Date(value)
            }

            ordersQuery = ordersQuery.where(index, operator, valueParams)
        }


        if (params.type === "orderBy") {

            const { index, orderDirection } = params
            ordersQuery = ordersQuery.orderBy(index, "desc")


        }

        // ordersQuery.orderBy()


    })


    // console.log(ordersQuery)

    const result = await ordersQuery.get()

    if (!result.empty) {
        console.log("hay resultado")

        const dataToSend = []

        result.forEach(order => {

            // console.log(order.data())
            dataToSend.push({
                ...order.data(),
                id: order.id
            })

        })

        console.log(dataToSend)

    } else {
        console.log("noi hay resultado")
    }




}