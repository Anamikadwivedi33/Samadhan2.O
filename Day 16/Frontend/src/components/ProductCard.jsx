import React from "react";
import { useStore } from "../context/StoreContext";

function ProductCard({ product }) {
  const { addToCart } = useStore();

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
