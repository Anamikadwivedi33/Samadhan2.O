import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// GET /api/cart  (protected)
export const getMyCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price");
    res.json(cart || { user: req.user._id, items: [] });
  } catch (e) { next(e); }
};

// POST /api/cart  (protected)  { productId, qty }
export const addToCart = async (req, res, next) => {
  try {
    const { productId, qty = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) { res.status(404); throw new Error("Product not found"); }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const idx = cart.items.findIndex(i => i.product.toString() === productId);
    if (idx > -1) cart.items[idx].qty += qty;
    else cart.items.push({ product: productId, qty });

    await cart.save();
    const populated = await cart.populate("items.product", "name price");
    res.status(201).json(populated);
  } catch (e) { next(e); }
};

// PUT /api/cart  (protected)  { productId, qty }
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) { res.status(404); throw new Error("Cart not found"); }

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) { res.status(404); throw new Error("Item not in cart"); }
    item.qty = qty;
    await cart.save();
    const populated = await cart.populate("items.product", "name price");
    res.json(populated);
  } catch (e) { next(e); }
};

// DELETE /api/cart/:productId  (protected)
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) { res.status(404); throw new Error("Cart not found"); }
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    const populated = await cart.populate("items.product", "name price");
    res.json(populated);
  } catch (e) { next(e); }
};

// DELETE /api/cart  (protected)  — clear cart
export const clearCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) { return res.json({ user: req.user._id, items: [] }); }
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (e) { next(e); }
};
