import express from "express"
import { addOrderItems, getOrderById, updateOrderToPaid } from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()


router.route("/").post(protect, addOrderItems)
// Bien mettre la route /:id APRES la route /
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)



export default router