import { v4 as uuidv4 } from 'uuid'
import { asyncHandler } from '../utils/asyncHandler.js'
export const attechSessionId = asyncHandler(async(req,res,next)=>{
   try {
     let sessionId = req.cookies?.sessionId
 
     if(!sessionId) {
         sessionId = uuidv4()
     }
 
     const options = {
         httpOnly:true,
         maxAge:30 * 24 * 60 * 60 * 1000,
         sameSite:'lax'
     }
 
     res.cookie('sessionId',sessionId,options)
 
     req.sessionId = sessionId
     next()
     } catch (error) {
        console.log("Eroor whem genranater sessionId in session middleware",error);
        
    
   }
 })
   