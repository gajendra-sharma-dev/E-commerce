import {Router}  from "express"
import { verfiyJWT } from "../middleware/auth.middleware.js"
import {createCategory,getCategoryById,getAllCategory,updateCategory,deleteCategory} from "../controllers/category.controllers.js"
const router = Router()

router.use(verfiyJWT)

router.route("/").post(createCategory)
router.route("/g/:categoryId").get(getCategoryById)
router.route("/all").get(getAllCategory)
router.route("/update/:categoryId").patch(updateCategory)
router.route("/delete/:categoryId").delete(deleteCategory)
export default router