import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <>
          {cart.map((i) => (
            <div key={i.id} className="cart-item">
              <h4>{i.title}</h4>
              <p>price{i.price}</p>
              

              <div>
                <button onClick={() => decreaseQty(i.id)}>-</button>
                <strong>{i.qty}</strong>
                <button onClick={() => increaseQty(i.id)}>+</button>
              </div>

              <button onClick={() => removeFromCart(i.id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

