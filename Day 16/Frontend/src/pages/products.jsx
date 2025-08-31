import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="products-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Products;
