import { db } from "../firebase/admind.js"

export const getOrdersServeces = async (pararam) => {


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


                return {
                    isSuccess: true,
                    dataToResponse,
                    lastRef: results.docs[results.docs.length - 1].id
                }

            })
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
                // console.log(order.data())
                orders.push({
                    ...order.data(),
                    id: order.id
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