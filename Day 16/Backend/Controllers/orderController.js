import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// POST /api/orders  (protected)  { items?, shippingAddress?, paymentMethod? }
export const createOrder = async (req, res, next) => {
  try {
    let items = req.body.items;

    // If items not passed, create order from cart
    if (!items || !items.length) {
      const cart = await Cart.findOne({ user: req.user._id }).populate("items.product", "name price");
      if (!cart || !cart.items.length) { res.status(400); throw new Error("Cart is empty"); }
      items = cart.items.map(i => ({
        product: i.product._id,
        name: i.product.name,
        qty: i.qty,
        price: i.product.price
      }));
    }

    const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

    const order = await Order.create({
      user: req.user._id,
      orderItems: items,
      shippingAddress: req.body.shippingAddress || {},
      paymentMethod: req.body.paymentMethod || "COD",
      totalPrice
    });

    // Optionally clear cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(order);
  } catch (e) { next(e); }
};

// GET /api/orders/my  (protected)
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (e) { next(e); }
};

// GET /api/orders/:id  (protected owner/admin)
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) { res.status(404); throw new Error("Order not found"); }
    if (!req.user.isAdmin && order.user._id.toString() !== req.user._id.toString()) {
      res.status(403); throw new Error("Not authorized to view this order");
    }
    res.json(order);
  } catch (e) { next(e); }
};


