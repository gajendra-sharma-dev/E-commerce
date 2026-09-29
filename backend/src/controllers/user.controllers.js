import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const genreteAccessAndRfreshToken = async(userId) =>{
  try {
    const user = await User.findById(userId)
    const AccessToken = user.genrateAccessToken()
    const refreshToken = user.genrateRefreshToken()
 
       user.refreshToken = refreshToken
         user.save({validateBeforeSave:false})
 
         return {AccessToken,refreshToken}
 }catch (error) {
   console.log("error while genrting access and refresh token",error);
   throw new ApiError(500,"Error while genrate access and refresh token")
   
  }
  } 

const registerUser = asyncHandler(async(req,res)=>{
    const {firstName,email,password,phoneNumber,lastName} = req.body
      // console.log(req.body);
    
 if([firstName,email,password,phoneNumber,lastName].some((field)=>(field?.trim() === ""))) {
    throw new ApiError(400,"all Filed is required")
 }
       const existingUser = await User.findOne({email})
         if(existingUser) {
            throw new ApiError(400,"Already this email exsit")
         }

     const user =  await User.create(
                {
           firstName,
           email,
           password,
           phoneNumber,
           lastName

           
                },
              
            )
   const createUser = await User.findById(user._id).select("-password -refreshToken")
   if(!createUser) {
    throw new ApiError(400,"user not find")
   }
            return res.status(200).
            json(new ApiResponse(200,createUser,"user register successfully"))

})

const loginUser  = asyncHandler(async(req,res)=>{
    const {firstName,email,password} = req.body

    if([firstName,email,password].some((filed)=>(filed?.trim() === ""))) {
      throw new ApiError(400,"All filed is required")
    }

 const exitingUser = await User.findOne({$or:[{firstName},{email}]})

     if(!exitingUser) {
        throw new ApiError(400,"user not find in database")
     }

   const iscorrectPassword = await exitingUser.ispasswordisCorrect(password)
     if(!iscorrectPassword) {
      throw new ApiError(400,"password is wrong")
     }

     const {AccessToken,refreshToken}  = await genreteAccessAndRfreshToken(exitingUser._id)
      
     const loginuser = await User.findById(exitingUser._id).select("-password  -refreshToken")
 

const options = {
   httpOnly:true,
   secure:true,
}

res.status(200).
cookie("AccessToken",AccessToken,options).
cookie("refreshToken",refreshToken,options).
json(new ApiResponse(200, {loginuser, AccessToken, refreshToken }, "User logged in successfully"))
     
})


const logout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user?._id,{$unset:{
      refreshToken:1
    }},
   {
      new : true
   })

   const options = {
      httpOnly:true,
      secure:true
   }
 return res.
 status(200).
 clearCookie("AccessToken",options).
 clearCookie("refreshToken",options).
 json(
  new ApiResponse(200,{},"User successfully logout")
 )
})


const updateDetail = asyncHandler(async(req,res)=>{
const {firstName,lastName,email,phoneNumber} = req.body
   if(!firstName || firstName?.trim() === ""){
      throw new ApiError(400,"firstName is required")
   }
    if(!lastName || lastName?.trim() === ""){
      throw new ApiError(400,"lastName is required")
   }
    if(!email || email?.trim() === ""){
      throw new ApiError(400,"email is required")
   }
    if(!phoneNumber || phoneNumber?.trim() === ""){
      throw new ApiError(400,"phoneNumber is required")
   }
   
   const user = await User.findByIdAndUpdate(req.user?._id,{$set: {firstName,lastName,email,phoneNumber}},
      { new: true }
   ).select("-password -refreshToken")

   

   return res.status(200).json(new ApiResponse(200, user, "User details updated successfully"))

})

const updatePassword = asyncHandler(async(req,res)=>{
   const {oldpassword,newpassword} = req.body

   if(!oldpassword) {
      throw new ApiError(400,"oldpassword is required")
   }
   if(!newpassword) {
      throw new ApiError(400,"new password is required")
   }

   const user = await User.findById(req.user?._id)
     
   const checkpassword  = await user.ispasswordisCorrect(oldpassword)

     if(!checkpassword) {
      throw new ApiError(400,"old password is wrong")

     }

      user.password = newpassword

     await user.save({validateBeforeSave:false})

   return res.status(201).
   json(new ApiResponse(201,user,"password is updated"))
})

const getUser = asyncHandler(async(req,res)=>{
   res.status(201).
   json(new ApiResponse(201,req.user,"user fetch successfully"))
})


 const refreshAccesstoken = asyncHandler(async (req,res) => {
  const incomingRefreshToken =  req.cookies.refreshToken || req.body.refreshToken


     if(!incomingRefreshToken) {  
      throw new ApiError(401,"unauthorization request")
     }

   try {
    const decodedToken =  jwt.verify(
       incomingRefreshToken,
       process.env.REFRESH_SECRET_REFERSH_KEY
      )
   console.log(decodedToken);
   
 
   const user =  await User.findById(decodedToken?._id)
 
      if(!user) { 
       throw new ApiError(410,"Invaild refresh token")
      }
   
 
       if(incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401,"Refresh token is expired or used")
       }
 
       
 const options ={
   httpOnly:true,
   secure:true,
 
  }
 
      const {AccessToken,refreshToken} = await genreteAccessAndRfreshToken(user._id)
 
        return res
        .status(200)
        .cookie("AccessToken",AccessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
         new ApiResponse(200,{AccessToken,refreshToken},"access token refersh successfully")
        )
   } catch (error) {
    throw new ApiError(401,error?.message || "Invaild refresh token")
    
   }
 })




export {registerUser,loginUser,logout,updateDetail,updatePassword,getUser,refreshAccesstoken}


