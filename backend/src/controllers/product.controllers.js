import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Product} from "../models/product.models.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/categories.models.js";
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";
const createProduct = asyncHandler(async(req,res)=>{
    const {name,description,stockQuanitity,price,isActive,category} = req.body

    if([name,description].some((filed)=> filed?.trim() === "")) {
        throw ApiError(400,"All filed is required")
    } 
 if(!mongoose.isValidObjectId(category)) {
    throw new ApiError(400,"category is not vaild")
 }

  

     const categoryDoucment =  await Category.findById(category)
     
     if(!categoryDoucment) {
        throw new ApiError(400,"category not found")
     }

   
     
   
 const product = await Product.create(
        {
            name,
            description,
            sku:uuidv4(),
            stockQuanitity,
            price,
            isActive,
            category:categoryDoucment?._id
        }
    )

    return res.status(201).
    json(new ApiResponse(201,product,"product create succssfully"))
})

const getProductById = asyncHandler(async(req,res)=>{
    const {productId} = req.params

    if(!mongoose.isValidObjectId(productId)) {
        throw ApiError(400,"product id is not vaild")
    }
 const product =  await Product.findById(productId)

 if(!product) {
    throw new ApiError(400,"product not found")
 }

      return res.status(200).
      json(new ApiResponse(200,product,"product fetch sussccfully"))
  

})


 const updateProduct = asyncHandler(async(req,res)=>{
    const {name,description,stockQuanitity,price,isActive} = req.body
    const {productId} = req.params
    if([name,description].some((filed)=> !filed || filed.trim() === "")) {
        throw new ApiError(400,"all filed is required")
    }

     if(!mongoose.isValidObjectId(productId)) {
    throw ApiError(400,"product id is not vaild")
 }

   const product = await Product.findById(productId)

   if(!product) {
    throw new ApiError(400,"product not found")
   }

//   const useFiled = {}
//   if(name.trim()) useFiled.name = name
//   if(description.trim()) useFiled.description = description
//   if(stockQuanitity !== undefined) useFiled.stockQuanitity = stockQuanitity
//   if(price !== undefined) useFiled.price = price
//   if(isActive !== undefined) useFiled.isActive = isActive
 ///ortanrgation rehe raha hai abi


  if(name.trim()) product.name = name
  if(description.trim()) product.description = description
  if(stockQuanitity !== undefined) product.stockQuanitity = stockQuanitity
  if(price !== undefined) product.price = price
  if(isActive !== undefined) product.isActive = isActive


 await product.save({validateBeforeSave:false})
  return res.status(200).
  json(new ApiResponse(200,product,"product updated succssfully"))
 })  


 const deleteProduct = asyncHandler(async(req,res)=>{
    const {productId} = req.params

    if(!mongoose.isValidObjectId(productId)) {
        throw new ApiError(400,"product id is not found")
    }

   const product = await Product.findById(productId)

   if(!product) {
    throw new ApiError(400,"product you want to delete does not exit")
   }

     await Product.findByIdAndDelete(productId)

     return res.status(200).
     json(new ApiResponse(200,{},"product delete succssfully"))
 })

export {createProduct,getProductById,updateProduct,deleteProduct}