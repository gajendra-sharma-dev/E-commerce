
import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from "../utils/ApiError.js"
import {Order} from "../models/orders.models.js"
import { Product } from '../models/product.models.js';
import {asyncHandler} from "../utils/asyncHandler.js"
import {Orderitem} from "../models/orderItem.models.js"
import mongoose from 'mongoose';


const createOrderItem = asyncHandler(async(req,res)=>{
    const {unitPrice,quanitity,productId,orderId,totelPrice} = req.body

      if(!mongoose.isValidObjectId(productId)) {
        throw new ApiError(400,"product id is not vaild")
      }

      if([unitPrice,quanitity,totelPrice].some((filed) => filed === undefined || filed === null  || isNaN(Number(filed)))) {
        throw new ApiError(400,"All filed is required")
      }

      if(!mongoose.isValidObjectId(orderId)) {
        throw new ApiError(400,"order id is not vaild")
      }

  const product =  await Product.findById(productId)

 const order =  await Orderitem.create(
        {
            unitPrice,
            quanitity,
            productId,
            orderId,
            totelPrice,
            productName: product?.name,
            sku:product?.sku
        }
      )
      return res.status(200).
      json(new ApiResponse(200,order,"order item succssfully created"))

})


const getOrderItemById = asyncHandler(async(req,res)=>{
  const {orderItemId} = req.params
    if(!mongoose.isValidObjectId(orderItemId)) {
      throw new ApiError(400,"orderItem id is not vaild")
    }

  const order = await Orderitem.findById(orderItemId)

  if(!order) {
    throw new ApiError(400,"order not found")
  }
  return res.status(201).json(
    new ApiResponse(201,order,"order fetch succssfully")
  )
})
const updateOrderItem = asyncHandler(async(req,res)=>{
  const {unitPrice,quanitity,totelPrice} = req.body
   const {orderItemId}  = req.params


     if(!mongoose.isValidObjectId(orderItemId)) {
        throw new ApiError(400,"order id is not vaild")
      }

      if([unitPrice,quanitity,totelPrice].some((filed) => filed === undefined || filed === null  || isNaN(Number(filed)))) {
        throw new ApiError(400,"All filed is required")
      }

  const orderItem =  await Orderitem.findById(orderItemId).populate("orderId")
  
  if(!orderItem) {
    throw ApiError(400,"order item you want to update not found")
  }

  if(orderItem.orderId?.user?.toString() !==  req.user?._id.toString()) {
    throw new ApiError(400,"you are not authRised to update this order item")
  }

    const usefiled = {}
    usefiled.unitPrice = unitPrice
     usefiled.quanitity = quanitity

  const updateDetail =   await Orderitem.findByIdAndUpdate(orderItemId,{$set:usefiled},{new:true})
   

  return res.status(201).json(new ApiResponse(201,updateDetail,"order Item is updated sussccfully"))


   

    

})

const deleteOrderItem = asyncHandler(async(req,res)=>{
   const {orderItemId}  = req.params

    if(!mongoose.isValidObjectId(orderItemId)) {
        throw new ApiError(400,"order id is not vaild")
      }

   const orderItem =   await Orderitem.findById(orderItemId).populate("orderId")

    if(!orderItem) {
      throw new ApiError(400,"order item you want to delete not found")
    }

    console.log(orderItem);
    
    
    if(orderItem.orderId?.user?.toString() !==  req.user?._id.toString()) {
    throw new ApiError(400,"you are not authRised to delete this order item")
  }

    await Orderitem.findByIdAndDelete(orderItemId)
  return res.status(201).json(new ApiResponse(201,{},"order item delete succssfully"))
})


export {createOrderItem,getOrderItemById,updateOrderItem,deleteOrderItem}