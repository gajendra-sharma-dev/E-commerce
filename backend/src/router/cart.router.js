import {Router} from  "express"
import { verfiyJWT } from "../middleware/auth.middleware.js"
import {addCart} from "../controllers/cart.controllers.js"
import {attechSessionId} from "../middleware/session.middleware.js"
const router = Router()

router.use(verfiyJWT)
router.use(attechSessionId)
router.route("/createCart").post(addCart)


export default router