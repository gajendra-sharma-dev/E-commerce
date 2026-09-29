
import {Router} from "express"
import { verfiyJWT } from "../middleware/auth.middleware.js"
import {registerUser,loginUser,logout,updateDetail,updatePassword,getUser,refreshAccesstoken}  from "../controllers/user.controllers.js"
  const router = Router()



router.route("/register").post(registerUser)  
router.route("/login").post(loginUser)  
router.route("/logout").post(logout)
router.route("/update").patch(verfiyJWT,updateDetail)
router.route("/updatepassword").patch(verfiyJWT,updatePassword)
router.route("/getuser").get(verfiyJWT,getUser)
router.route("/refreshaccesstoken").post(refreshAccesstoken)





export default router