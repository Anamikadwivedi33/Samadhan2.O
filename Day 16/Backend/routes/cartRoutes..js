import express from "express";
import {
  getMyCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCartItem);
router.delete("/", protect, clearCart);
router.delete("/:productId", protect, removeFromCart);

export default router;
