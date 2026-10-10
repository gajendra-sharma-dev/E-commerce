import { Router } from "express";
import {createCart,getAllCart,getCartById,deleteCart} from "../controllers/cart.controllers.js"

import { verfiyJWT } from "../middleware/auth.middleware.js";
import {heandlerSession} from "../middleware/session.middleware.js"
const router = Router()

router.use(verfiyJWT)

router.use(heandlerSession)

router.route("/createCart").post(createCart)
router.route("/get/:cartId").get(getCartById) 
router.route("/gets/:cartId").get(getAllCart)
router.route("delete/:cartId").delete(deleteCart)

export default router