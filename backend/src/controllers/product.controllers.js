import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Product} from "../models/product.models.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import cloudnary from "../utils/cloudnary.js";

const createProduct = asyncHandler(async(req,res)=>{
    const {name,description,price,stockQuantity} = req.body
    let imageUrl = req.file?.path
    if(!imageUrl) {
        throw new ApiError(400,"image is required")
    }
    
   if(!name || name?.trim() === "") {
    throw new ApiError(400,"name is required")
   }
   if(!description || description?.trim() === "") {
    throw new ApiError(400,"description is required")
   }
   if(!price || price <= 0) {
    throw new ApiError(400,"price is required and must be a positive number")
   }
   if(!stockQuantity || stockQuantity < 0) {
    throw new ApiError(400,"stock quantity is required and must be a non-negative number")
   }
     
   try {
     let imageUrl = req.file ? req.file.path : "";
    if(req.file) {
   const result = await cloudnary.uploader.upload(req.file.path);
     imageUrl = result.secure_url
   }

   const product = await Product.create(
        {
            name,
            description,
            imageUrl,
            stockQuantity,
            price,
            category
            
            
        }
    )
    
    return res.status(201).
    json(new ApiResponse(201,product,"product create succssfully"))

   } catch (error) {
     console.log(error,"sever error");
     throw new ApiError(500,"sever error")
   }
})

const getProductById = asyncHandler(async(req,res)=>{
    const {productId} = req.params

    if(!mongoose.isValidObjectId(productId)) {
        throw new ApiError(400,"product id is not vaild")
    }
 const product =  await Product.findById(productId)

 if(!product) {
    throw new ApiError(400,"product not found")
 }

      return res.status(200).
      json(new ApiResponse(200,product,"product fetch sussccfully"))
  

})


 const updateProduct = asyncHandler(async(req,res)=>{
    const {name,description,price,stockQuantity,category} = req.body
    const {productId} = req.params
  

     if(!mongoose.isValidObjectId(productId)) {
    throw new ApiError(400,"product id is not vaild")
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


  if(name?.trim()) product.name = name
  if(description?.trim()) product.description = description
  if(stockQuantity !== undefined) product.stockQuantity = stockQuantity
  if(price !== undefined) product.price = price
  if(category?.trim()) product.category = category
     if(req.file) {
        console.log(req.file);
        
     const result = await cloudnary.uploader.upload(req.file.path);
    console.log(result);
    
     product.imageUrl = result.secure_url
   }

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

 const getAllproduct = asyncHandler(async(req,res)=>{
    const product = await Product.find({})
    if(!product) {
        throw new ApiError(400,"empty nothing here")
    }
    return res.status(201).json(new ApiResponse(201,product,"products fetch successfully"))
 })

export {createProduct,getProductById,updateProduct,deleteProduct,getAllproduct}