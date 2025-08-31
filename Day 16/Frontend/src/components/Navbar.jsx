import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

function Navbar() {
  const { cart } = useStore();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
}

export default Navbar;
