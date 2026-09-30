import {Router} from "express"
import { createOrderItem,updateOrderItem,getOrderItemById,deleteOrderItem } from "../controllers/orderItem.controllers.js"
import {verfiyJWT} from "../middleware/auth.middleware.js"

const router = Router()

router.use(verfiyJWT)

router.route("/createitem").post(createOrderItem)
router.route("/get/:orderItemId").get(getOrderItemById)
router.route("/update/:orderItemId").patch(updateOrderItem)
router.route("/delete/:orderItemId").delete(deleteOrderItem)
export default router