import { getOrdersServeces } from "../services/firebaseServicer.js"

 export const getOrders = async (req, res) => {


    
const {  lastReaf, isSuccess, reason, dataToResponse  } =  await getOrdersServeces()

        // console.log(dataToResponse)


        if(isSuccess === true){
            res.json({
                isSuccess: true,
                hasData: true,
                orders: dataToResponse,
                ...(lastReaf? {lastReaf}: {})
            })
            return
        }

        if(reason==="not result"){
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


    export const getOrdersByUser = async (req, res)=>{

        c

        res.json({
            message: "estas en la ruta de usario"
        })
    }
