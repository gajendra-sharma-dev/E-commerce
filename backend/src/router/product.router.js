import {Router} from "express"
import {verfiyJWT} from "../middleware/auth.middleware.js"
import { createProduct,getProductById,updateProduct,deleteProduct } from "../controllers/product.controllers.js"
const router = Router()

router.use(verfiyJWT)

router.route("/create").post(createProduct)
router.route("/get/:productId").get(getProductById)
router.route("/update/:productId").patch(updateProduct)
router.route("/delete/:productId").delete(deleteProduct)
export default router