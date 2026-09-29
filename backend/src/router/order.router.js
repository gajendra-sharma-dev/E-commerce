import {Router} from "express"
import { verfiyJWT } from "../middleware/auth.middleware.js"
import { createOrder,getOrderById,updateOrder,deleteOrder } from "../controllers/order.controllers.js"
const router = Router()


router.use(verfiyJWT)

router.route("/createOrder").post(createOrder)
router.route("/get/:orderId").get(getOrderById)
router.route("/update/:orderId").patch(updateOrder)
router.route("/delete/:orderId").delete(deleteOrder)
export default router