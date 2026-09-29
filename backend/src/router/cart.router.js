import {Router} from  "express"
import { verfiyJWT } from "../middleware/auth.middleware.js"
import {addCart} from "../controllers/cart.controllers.js"

const router = Router()

router.use(verfiyJWT)
router.route("/createCart").post(addCart)


export default router