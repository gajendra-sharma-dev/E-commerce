import { v4 as uuidv4 } from 'uuid';

const heandlerSession = (req,res,next) => {
    let sessionId = req.cookies.sessionId
   if(!sessionId) {
    sessionId = uuidv4()


    req.cookies("sessionId",sessionId,{
      maxAge:30*24*60*60*1000,
      httpOnly:true,
      
    })
 }

 req.sessionId = sessionId
 next()



}

export default heandlerSession

 
