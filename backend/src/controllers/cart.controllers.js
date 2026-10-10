import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Cart} from "../models/cart.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";


const createCart = asyncHandler(async(req,res)=>{ 
    const userId = req.user?._id || req.body.userId
    const sessionId = req.sessionId

    if(!userId) {
  throw new ApiError(400,"userId not found")
    }
    if(!sessionId) {
        throw new ApiError(400,"sessionId not found")
    }

  const cart =  await Cart.create({
      sessionId,
      userId
    })

    return req.status(201).json(new ApiResponse(201,cart,"cart create successfully"))
})

const getCartById = asyncHandler(async(req,res)=>{
    const {cartId}  = req.params

    if(!mongoose.isValidObjectId(cartId)) {
        throw new ApiError(400,"cart id is not vaild")
    }

    if(cartId) {
        throw new ApiError(400,"cart id is requird")
    }
     const cart  =  await Cart.findById(cartId)

    if(!cart) {
      throw new ApiError(400,"cart not found")
   }
  return req.status(201).json(201,cart,"cart fetch sussessfully")


})

const getAllCart = asyncHandler(async(req,res)=>{
    const carts = await Cart.find({})

    return req.status(201).json(201,carts,"get all cart successfully")
})


const deleteCart = asyncHandler(async(req,res)=>{
    const {cartId} = req.params


     if(!mongoose.isValidObjectId(cartId)) {
        throw new ApiError(400,"cart id is not vaild")
    }

    if(cartId) {
        throw new ApiError(400,"cart id is requird")
    }

 const cart = await Cart.findById(cartId)

   if(cart) {
    throw new ApiError(400,"cart you want to delete not found")
   }
   if(cartId?._id.toString() !== req.user?._id.toString() && cartId?._id.toString() !== req.sessionId.toString()) {
     throw new ApiError(400,"you can not delete this cart")
   } 

   await  Cart.findByIdAndDelete(cartId)

   return req.status(201).json(201,{},"cart delele successfully")
})

export default {createCart,getAllCart,getCartById,deleteCart}