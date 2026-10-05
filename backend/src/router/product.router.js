import {Router} from "express"
import {verfiyJWT} from "../middleware/auth.middleware.js"
import { createProduct,getProductById,updateProduct,deleteProduct,getAllproduct } from "../controllers/product.controllers.js"
import admin from "../middleware/role.middleware.js"
import upload from "multer";
import multer from "multer";
const router = Router()
const uploadMiddleware = multer({ dest: "uploads/" });

router.use(verfiyJWT)

router.route("/create").post(admin, uploadMiddleware.single('image'), createProduct)
router.route("/get/:productId").get(getProductById)
router.route("/update/:productId").patch(admin,uploadMiddleware.single('image'), updateProduct)
router.route("/delete/:productId").delete(admin,uploadMiddleware.single("image"), deleteProduct)
router.route("/getAll").get(getAllproduct)
export default router