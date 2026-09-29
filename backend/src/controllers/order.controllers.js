import { v4 as uuidv4 } from 'uuid';

import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from "../utils/ApiError.js"
import {Order} from "../models/orders.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Addresses}  from "../models/addresses.models.js"
import mongoose from 'mongoose';
const createOrder = asyncHandler(async(req,res)=>{
    const {totelAmount,taxAmount,subTotel,shippingCost,Status} = req.body


     if([totelAmount,taxAmount,subTotel,shippingCost,Status].some((filed) => filed?.trim() === "")) {
       throw new ApiError(400,"all filed is required")
    }
  const addressUser = await Addresses.findOne({customer:req.user?._id})
  console.log(addressUser)
    if(!addressUser) {
        throw new ApiError(400,"address is not vaild")
    }
   
  const order = await Order.create(
        {
            user:req.user?._id,
            shippingAddress:addressUser._id,
            billingAddress:addressUser._id,
            orderNumber:uuidv4(),
            Status,
            totelAmount,
            taxAmount,
            subTotel,
            shippingCost

        }
     )

     return res.status(200).
     json(new ApiResponse(200,order,"order is created succssfully"))

})


const getOrderById = asyncHandler(async(req,res)=>{
  const {orderId} = req.params

  if(!mongoose.isValidObjectId(orderId)) {
      throw new ApiError(400,"order id is not vaild")
  }

  const order =  await Order.findById(orderId)
  console.log(order);

    if(!order) {
      throw new ApiError(400,"order is not found")
    }
    return res.status(201).
    json(new ApiResponse(201,order,"order fetch sussccfully"))
  
})

const updateOrder = asyncHandler(async(req,res)=>{
  const {totelAmount,taxAmount,subTotel,shippingCost,Status}  = req.body
  const {orderId}  = req.params

  if(!mongoose.isValidObjectId(orderId)) {
    throw new ApiError(400,"order id is not vaild")
  }

   if([totelAmount,taxAmount,subTotel,shippingCost,Status].some((filed) => filed?.trim() === "")) {
       throw new ApiError(400,"all filed is required")
    }

 const order = await Order.findById(orderId)

 

  if(!order) {
    throw new ApiError(400,"order not found")
  }

  if(order.user?._id.toString() !== req.user?._id.toString()) {
    throw new ApiError(400,"you are not authrised to update order")
  }

  const filed = {}
  if(totelAmount.trim())  filed.totelAmount = totelAmount
  if(taxAmount.trim())  filed.taxAmount = taxAmount
  if(subTotel.trim())  filed.subTotel = subTotel
  if(shippingCost.trim())  filed.shippingCost = shippingCost
  if(Status.trim())  filed.Status = Status


const updateorder   =  await Order.findByIdAndUpdate(orderId,{$set:
    filed
  },
  {
    new:true
  }
)

return res.status(200).
json(new ApiResponse(200,updateorder,"order update succssfully"))
})

const deleteOrder = asyncHandler(async(req,res)=>{
  const {orderId} = req.params

  if(!mongoose.isValidObjectId(orderId)) {
    throw new ApiError(400,"order id not vaild")
  }

  const order =  await Order.findById(orderId)
     if(!order) {
      throw new ApiError(400,"order you want to delete not found")
     }

     if(order.user?._id.toString() !== req.user?._id.toString()) {
      throw new ApiError(400,"you are not authrised to delete this order")
     }

     await Order.findByIdAndDelete(orderId)

     return res.status(201).json(
      new ApiResponse(201,{},"your order susseccfully deleled")
     )
})




export {createOrder,getOrderById,updateOrder,deleteOrder}