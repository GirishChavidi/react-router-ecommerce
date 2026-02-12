import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, total } = useCart();

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const isFormValid =
    address.name && address.street && address.city && address.zip;

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-box" style={{ textAlign: "center" }}>
          <h2>Your cart is empty 🛒</h2>
          <Link to="/" className="continue-btn">Go Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2>Checkout</h2>

        {/* ORDER SUMMARY */}
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{item.title} × {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}

        <h3>Total: ${total.toFixed(2)}</h3>

        {/* ADDRESS */}
        <h3>Delivery Address</h3>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="street" placeholder="Street Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="zip" placeholder="ZIP Code" onChange={handleChange} />

        {/* LINK TO PAYMENT */}
        <Link
          to="/payment"
          state={{ address }}
          onClick={(e) => {
            if (!isFormValid) {
              e.preventDefault();
              alert("Please fill all address fields");
            }
          }}
          className="continue-btn"
        >
          Continue to Payment
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
