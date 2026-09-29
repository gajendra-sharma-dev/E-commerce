import { Router } from "express";
import { addAddress,getAddressById,updateAddress,deleteAddress,getAllAddress} from "../controllers/addresses.controllers.js";
import { verfiyJWT } from "../middleware/auth.middleware.js";
const router = Router()



router.use(verfiyJWT)

router.route("/").post(addAddress)
router.route("/get/:addressId").get(getAddressById)
router.route("/update/:addressId").patch(updateAddress)
router.route("/delete/:addressId").delete(deleteAddress)
router.route("/getallAddress").get(getAllAddress)
export default router