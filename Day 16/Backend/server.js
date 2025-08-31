import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const productSchema = new mongoose.Schema({ name: String, price: Number, image: String });
const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => res.json(await Product.find()));
app.post("/api/products", async (req, res) => res.json(await new Product(req.body).save()));

app.post("/api/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.cart.map(p => ({
        price_data: { currency: "usd", product_data: { name: p.name }, unit_amount: p.price * 100 },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
