import Product from "../models/productModel.js";

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) { next(e); }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error("Product not found"); }
    res.json(product);
  } catch (e) { next(e); }
};

// POST /api/products  (protected + admin)
export const createProduct = async (req, res, next) => {
  try {
    const { name, image, description, brand, category, price, countInStock } = req.body;
    const product = await Product.create({
      name, image, description, brand, category, price, countInStock
    });
    res.status(201).json(product);
  } catch (e) { next(e); }
};

// PUT /api/products/:id  (protected + admin)
export const updateProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) { res.status(404); throw new Error("Product not found"); }
    const fields = ["name","image","description","brand","category","price","countInStock"];
    fields.forEach(f => { if (req.body[f] !== undefined) p[f] = req.body[f]; });
    const updated = await p.save();
    res.json(updated);
  } catch (e) { next(e); }
};

// DELETE /api/products/:id  (protected + admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) { res.status(404); throw new Error("Product not found"); }
    await p.deleteOne();
    res.json({ message: "Product removed" });
  } catch (e) { next(e); }
};
