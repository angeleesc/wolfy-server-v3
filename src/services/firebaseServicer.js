import { db } from "../firebase/admind.js"

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

        }else{
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