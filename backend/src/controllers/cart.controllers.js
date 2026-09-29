import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Cart}  from "../models/cart.models.js"


const addCart = asyncHandler(async(req,res)=>{
    const userId = req.user?._id
    const sessionId = req.sessionId

    if(!userId && !sessionId) {
        throw new ApiError(400,"unable to identifity user or sessionId")
    }
    
   

  const cart =  await Cart.create(
        {
            customer:userId || null,
            sessionId: userId ? null : sessionId
        },
       
    )

    return res.status(201).
    json(new ApiResponse(201,cart,"new cart create succssfully"))
})

const getallCart = asyncHandler(async(req,res)=>{
   

})

const updateCart = asyncHandler(async(req,res)=>{

})

const deleteCart = asyncHandler(async(req,res)=>{

})

export {addCart}