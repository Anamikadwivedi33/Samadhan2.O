
import React from "react";
import { useStore } from "../context/StoreContext";

function Cart() {
  const { cart, removeFromCart } = useStore();

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        cart.map((item, i) => (
          <div key={i}>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
