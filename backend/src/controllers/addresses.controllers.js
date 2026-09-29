import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Addresses} from "../models/addresses.models.js"
import mongoose from "mongoose"




const addAddress = asyncHandler(async(req,res)=>{
   const{city,state,country,phoneNumber,postelCode,line1,line2} = req.body
     

   if([city,state,country,phoneNumber,postelCode,line1,line2].some((filed)=> !filed || filed.trim() === "")) {
    throw new ApiError(400,"all filed is required")
   }

  const exitingAddress = await Addresses.findOne({$or:[{line1},{line2}]})
  if(exitingAddress) {
    throw new ApiError(400,"Address is already exit")
  }
     
   const address =  await Addresses.create(
            {
                city,
                state,
                country,
                phoneNumber,
                postelCode,
                line1,
                line2,
               customer: req.user?._id
            }
          )

    return res.status(201).json(
        new ApiResponse(201,address,"create new address")
    )

})

const getAddressById = asyncHandler(async(req,res)=>{
  const {addressId} = req.params

  if(!mongoose.isValidObjectId(addressId)) {
    throw new ApiError(400,"address id not found")
  }

 const address  = await Addresses.findById(addressId)

  if(!address) {
    throw new ApiError(400,"address not found")
  }

  return res.status(201).
  json(new ApiResponse(201,address,"address fetch succssfully"))
   
})

const getAllAddress = asyncHandler(async(req,res)=>{
    const {page=1,limit=10,sortType="newest",query=""} = req.query

    const filter = query ? {city:{$regex:query,$options:'i'}} : {}

    const sortOptions = {createdAt:-1}

    if(sortType === "oldest") {
        sortOptions = {createdAt:1}
    }else if(sortType === "az") {
        sortOptions = {city:1}
    }else if(sortType === "za"){
        sortOptions = {city:-1}
    }


    const allAddress = await Addresses.find(filter).
    sort(sortOptions)
    .skip((page - 1)* limit)
    .limit(Number(limit))


    const totelAddress = await Addresses.countDocuments(filter)

    return res.status(201).
    json(new ApiResponse(201,{allAddress,totelAddress,totelPage:Math.ceil(totelAddress/limit),currnetPage:Number(page)},"all address succssfully fetch"))
})

const updateAddress = asyncHandler(async(req,res)=>{
    const {city,state,country,phoneNumber,postelCode,line1,line2} = req.body
   const {addressId} = req.params
    if([city,state,country,phoneNumber,postelCode,line1,line2].some((filed)=> !filed || filed.trim() === "")){
        throw new ApiError(400,"all filed is required")
    }

    if(!mongoose.isValidObjectId(addressId)) {
        throw new ApiError(400,"address id is not in correct formet")
    }

const address = await Addresses.findById(addressId)

if(!address) {
    throw new ApiError(400,"address not found")
}

   if(address.customer.toString() !== req.user?._id.toString()){
    throw new ApiError(400,"you are not authrised to update this address")
   }

 const updateAddresses = await Addresses.findByIdAndUpdate(addressId,{$set:{
    city,
    state,
    country,
    phoneNumber,
    postelCode,
    line1,
    line2

   }},{
    new:true
   })
   return res.status(200).
   json(new ApiResponse(201,updateAddresses,"address succssfully updated"))
})

const deleteAddress = asyncHandler(async(req,res)=>{
 const {addressId} = req.params

  if(!mongoose.isValidObjectId(addressId)) {
        throw new ApiError(400,"address id is not in correct formet")
    }

    const address = await Addresses.findById(addressId)

if(!address) {
    throw new ApiError(400,"address not found")
}
 if(address.customer.toString() !== req.user?._id.toString()){
    throw new ApiError(400,"you are not authrised to delete this address")
   }

   await Addresses.findByIdAndDelete(addressId)

   res.status(201).
   json(new ApiResponse(201,{},"address succssfully deleted"))
})


export {addAddress,getAddressById,updateAddress,deleteAddress,getAllAddress}