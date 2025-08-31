import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => { axios.get("http://localhost:5000/api/products").then(r => setProducts(r.data)); }, []);
  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p._id}>
          {p.name} - ${p.price}
          <button onClick={() => addToCart(p)}>Add</button>
        </div>
      ))}
    </div>
  );
}

function Cart({ cart }) {
  const total = cart.reduce((s, p) => s + p.price, 0);
  const checkout = async () => {
    const res = await axios.post("http://localhost:5000/api/checkout", { cart });
    window.location.href = res.data.url;
  };
  return (
    <div>
      <h2>Cart</h2>
      {cart.map((p, i) => <div key={i}>{p.name} - ${p.price}</div>)}
      <h3>Total: ${total}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

function Success() { return <h2>Payment Successful 🎉</h2>; }

export default function App() {
  const [cart, setCart] = useState([]);
  const addToCart = p => setCart([...cart, p]);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart ({cart.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
