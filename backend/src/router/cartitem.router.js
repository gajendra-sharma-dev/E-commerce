import {Router} from  "express"
import { verfiyJWT } from "../middleware/auth.middleware.js"
import {createCartItem,getCartItemById,updateCartItem,deleteCartItem} from "../controllers/cartItem.controllers.js"

const router = Router()

router.use(verfiyJWT)
router.route("/create").post(createCartItem)
router.route("/get/:cartitemId").get(getCartItemById)
router.route("/update/:cartitemId").patch(updateCartItem)
router.route("/delete/:cartitemId").delete(deleteCartItem)


export default router