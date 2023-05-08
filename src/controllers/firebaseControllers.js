import { getOrdersByUserServices, getOrdersServeces } from "../services/firebaseServicer.js"

export const getOrders = async (req, res) => {



    const { lastReaf, isSuccess, reason, dataToResponse } = await getOrdersServeces()

    console.log(dataToResponse)


    if (isSuccess === true) {
        res.json({
            isSuccess: true,
            hasData: true,
            orders: dataToResponse,
            ...(lastReaf ? { lastReaf } : {})
        })
        return
    }

    if (reason === "not result") {
        res.json({
            isSuccess: true,
            hasData: false,

        })
    }

    res.send({
        message: "estas en la ruta donde ordenes generales",
        isSuccess: false
    })

    return
}


export const getOrdersByUser = async (req, res) => {



    const { wallet, fillter } = req.body

    if (!wallet) {

        res.status(500).send({
            message: "lo siento pero la wallet del usuario es requerido"
        })

        return
    }



    const detaToSend = await getOrdersByUserServices(wallet, fillter)

    res.send({
        message: "estas en la ruta de ordenes por usuario",
        ...detaToSend
    })

}



export const GetAcutionOdersByBuyer = async (req, res) => {

    const { id } = req.params

    const buyerOrdersQuery = db

    console.log(id)

    res.status(200).json({
        isSuccess: true,
        message: "estas en la ruta obtencion de las ofertas hechas por el usuario"
    })

}
