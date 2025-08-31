import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
