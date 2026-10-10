import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Cartitem}  from "../models/cartItem.models.js"
import mongoose from "mongoose"



const createCartItem = asyncHandler(async(req,res)=>{
    const {unitPrice,quanitity,productId} = req.body

    if(!mongoose.isValidObjectId(productId)) {
        throw new ApiError(400,"product id is not vaild")
    }
   

    if([unitPrice,quanitity].some((filed)=> filed === undefined || filed === null || isNaN(Number(filed)))) {
        throw new ApiError(400,"all filed is reuired")
    }

 const newCart = await Cartitem.create(
        {
            unitPrice,
            quanitity,
            productId:productId,
            customer:req.user._id
        }
    )
  return res.status(201).json(new ApiResponse(201,newCart,"Cart item is create succssfully"))
    
})

const getCartItemById = asyncHandler(async(req,res)=>{

    const {cartitemId} = req.params

    if(!mongoose.isValidObjectId(cartitemId)) {
        throw new ApiError(400,"cart item id is not vaild")
    }

   const cartitem  = await  Cartitem.findById(cartitemId)

   if(!cartitem) {
    throw new ApiError(400,"cart item is not found")
   }

   return res.status(201).json(new ApiResponse(201,cartitem,"cart item fetch succssfully"))
})

const updateCartItem = asyncHandler(async(req,res)=>{
   const {unitPrice,quanitity} = req.body
  const {cartitemId} = req.params

  if(!mongoose.isValidObjectId(cartitemId)) {
    throw new ApiError(400,"cart item id is not vaild")
  }
 
if([unitPrice,quanitity].some((filed)=> filed === undefined || filed === null || isNaN(Number(filed)))) {
        throw new ApiError(400,"all filed is reuired")
    }
  const cartObject =  await Cartitem.findById(cartitemId).populate("customer")
    console.log(cartObject);
    
    if(!cartObject) {
        throw new ApiError(400,"cart is not found")
    }

    if(cartObject.customer?._id.toString() !== req.user?._id.toString()) {
        throw new ApiError(400,"you are not auturised to updated this cart item")
    }

    const updateDetails  = await Cartitem.findByIdAndUpdate(cartitemId,{$set:{
        unitPrice,
        quanitity
    }},{new:true})

    return res.status(200).json(new ApiResponse(200,updateDetails,"cart item update succssfully"))
})

const deleteCartItem = asyncHandler(async(req,res)=>{
    const {cartitemId} = req.params

  if(!mongoose.isValidObjectId(cartitemId)) {
    throw new ApiError(400,"cart item id is not vaild")
  }
 

  const cartObject =  await Cartitem.findById(cartitemId).populate("customer")
    console.log(cartObject);
    
    if(!cartObject) {
        throw new ApiError(400,"cart is not found")
    }

    if(cartObject.customer?._id.toString() !== req.user?._id.toString()) {
        throw new ApiError(400,"you are not auturised to delete this cart item")
    }

    await Cartitem.findByIdAndDelete(cartitemId)

    return res.status(200).json(new ApiResponse(200,{},"cart item delete succssfully"))

})
 

export {createCartItem,getCartItemById,updateCartItem,deleteCartItem}