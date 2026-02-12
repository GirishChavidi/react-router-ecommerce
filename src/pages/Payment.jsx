import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();

  const address = location.state?.address;

  const [payment, setPayment] = useState("cod");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!address) {
      navigate("/checkout");
    }
  }, [address, navigate]);

  const validatePayment = () => {
    if (payment === "card") return card.number && card.expiry && card.cvv;
    if (payment === "upi") return upi;
    return true;
  };

  const saveOrder = () => {
    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      address,
      payment,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("orders", JSON.stringify([newOrder, ...oldOrders]));
  };

  const payNow = () => {
    if (!validatePayment()) {
      alert("Please fill payment details");
      return;
    }

    saveOrder();
    clearCart();
    setSuccess(true);

    
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  if (success) {
    return (
      <div className="checkout-container">
        <div className="checkout-box" style={{ textAlign: "center" }}>
          <h2>✅ Payment Successful</h2>
          <p>Thank you for shopping with G MART </p>
          <p>Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2>Payment</h2>

        <h3>Total Payable: ${total.toFixed(2)}</h3>

        {/* PAYMENT METHOD */}
        <h3>Payment Method</h3>

        <div className="payment-options">
          <div
            className={payment === "cod" ? "pay-card active" : "pay-card"}
            onClick={() => setPayment("cod")}
          >
            <input type="radio" checked={payment === "cod"} readOnly />
            <span>💵 Cash on Delivery</span>
          </div>

          <div
            className={payment === "card" ? "pay-card active" : "pay-card"}
            onClick={() => setPayment("card")}
          >
            <input type="radio" checked={payment === "card"} readOnly />
            <span>💳 Credit / Debit Card</span>
          </div>

          <div
            className={payment === "upi" ? "pay-card active" : "pay-card"}
            onClick={() => setPayment("upi")}
          >
            <input type="radio" checked={payment === "upi"} readOnly />
            <span>📱 UPI</span>
          </div>
        </div>

        {/* CARD FORM */}
        {payment === "card" && (
          <div className="pay-form">
            <input
              placeholder="Card Number"
              onChange={(e) => setCard({ ...card, number: e.target.value })}
            />
            <input
              placeholder="MM/YY"
              onChange={(e) => setCard({ ...card, expiry: e.target.value })}
            />
            <input
              placeholder="CVV"
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            />
          </div>
        )}

        {/* UPI FORM */}
        {payment === "upi" && (
          <div className="pay-form">
            <input
              placeholder="UPI ID"
              onChange={(e) => setUpi(e.target.value)}
            />
          </div>
        )}

        <button onClick={payNow}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment;

