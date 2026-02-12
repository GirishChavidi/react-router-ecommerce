import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="details">
      <img src={product.thumbnail} alt={product.title} />

      <div className="info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>

        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      {showToast && <div className="toast">HEYY... Item added to cart</div>}
    </div>
  );
};

export default ProductDetails;







