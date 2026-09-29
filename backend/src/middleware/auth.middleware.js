import jwt  from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
export const verfiyJWT = asyncHandler(async(req,res,next)=>{
   try {
     const token = req.cookies.AccessToken || req.header("authorization")?.replace("Bearer ","")
 
     if(!token) {
    throw new ApiError(400,"unauthorization request")
     }
   
 const decodeToken = jwt.verify(token,process.env.ACCESSTOKEN_SECRET_ACCESS_KEY)
   
 
 const user = await User.findById(decodeToken._id)
      
      req.user = user
      next()
   } catch (error) {
      throw new ApiError(400,error?.massage || "invalid access token")
   }
})